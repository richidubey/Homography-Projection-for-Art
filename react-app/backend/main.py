from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
import io
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def order_points(pts):
    """Order points in clockwise sequence: top-left, top-right, bottom-right, bottom-left"""
    print("\nInput points to order_points:")
    print(pts)
    
    # Convert to numpy array if not already
    pts = np.array(pts, dtype=np.float32)
    
    # Find the centroid
    centroid = np.mean(pts, axis=0)
    
    # Calculate angles from centroid to points
    diff = pts - centroid
    angles = np.arctan2(diff[:, 1], diff[:, 0])
    
    # Sort points by angle
    sorted_indices = np.argsort(angles)
    sorted_pts = pts[sorted_indices]
    
    print("Ordered points output:")
    print(sorted_pts)
    return sorted_pts

def compute_homography(src_pts, dst_pts):
    """Compute homography matrix using Direct Linear Transform."""
    print("\nComputing homography:")
    print("Source points:", src_pts)
    print("Destination points:", dst_pts)
    
    if src_pts.shape != (4, 2) or dst_pts.shape != (4, 2):
        raise ValueError("Source and destination points must each be 4x2 arrays")
    
    # Create matrix A for homogeneous solution
    A = []
    for i in range(4):
        x, y = src_pts[i]
        u, v = dst_pts[i]
        A.append([x, y, 1, 0, 0, 0, -u*x, -u*y, -u])
        A.append([0, 0, 0, x, y, 1, -v*x, -v*y, -v])
    A = np.array(A)
    
    # Solve for h using SVD
    _, _, Vh = np.linalg.svd(A)
    H = Vh[-1].reshape(3, 3)
    
    # Normalize homography matrix
    H = H / H[2, 2]
    
    print("Computed homography matrix:")
    print(H)
    return H

def apply_homography(img, H, output_width, output_height):
    """Apply homography transformation with bilinear interpolation."""
    print("\nApplying homography:")
    print(f"Input image shape: {img.shape}")
    print(f"Output dimensions: {output_width}x{output_height}")
    
    # Create meshgrid of output pixel coordinates
    y, x = np.mgrid[0:output_height, 0:output_width]
    coords = np.stack([x, y, np.ones_like(x)], axis=-1)
    
    # Apply inverse homography
    H_inv = np.linalg.inv(H)
    print("Inverse homography matrix:")
    print(H_inv)
    
    source_coords = coords @ H_inv.T
    source_coords = source_coords[..., :2] / source_coords[..., 2:3]
    
    # Print coordinate ranges
    print(f"Source X range: {np.min(source_coords[..., 0])} to {np.max(source_coords[..., 0])}")
    print(f"Source Y range: {np.min(source_coords[..., 1])} to {np.max(source_coords[..., 1])}")
    
    # Get integer and fractional parts for interpolation
    source_x = source_coords[..., 0]
    source_y = source_coords[..., 1]
    
    x0 = np.floor(source_x).astype(np.int32)
    x1 = x0 + 1
    y0 = np.floor(source_y).astype(np.int32)
    y1 = y0 + 1
    
    # Create mask for valid pixels before clipping
    valid_mask = (
        (source_x >= 0) & (source_x < img.shape[1]-1) &
        (source_y >= 0) & (source_y < img.shape[0]-1)
    )
    
    # Clip coordinates to image boundaries
    x0 = np.clip(x0, 0, img.shape[1]-1)
    x1 = np.clip(x1, 0, img.shape[1]-1)
    y0 = np.clip(y0, 0, img.shape[0]-1)
    y1 = np.clip(y1, 0, img.shape[0]-1)
    
    # Calculate interpolation weights
    wx = source_x - x0
    wy = source_y - y0
    wx = np.clip(wx, 0, 1)
    wy = np.clip(wy, 0, 1)
    
    # Initialize output array
    output = np.zeros((output_height, output_width, 3), dtype=np.uint8)
    
    # Only process valid pixels
    valid_y, valid_x = np.where(valid_mask)
    
    for i in range(len(valid_y)):
        y_idx = valid_y[i]
        x_idx = valid_x[i]
        
        # Get the four surrounding pixels
        tl = img[y0[y_idx, x_idx], x0[y_idx, x_idx]]
        tr = img[y0[y_idx, x_idx], x1[y_idx, x_idx]]
        bl = img[y1[y_idx, x_idx], x0[y_idx, x_idx]]
        br = img[y1[y_idx, x_idx], x1[y_idx, x_idx]]
        
        # Calculate weights
        w_x = wx[y_idx, x_idx]
        w_y = wy[y_idx, x_idx]
        
        # Perform interpolation
        output[y_idx, x_idx] = (
            tl * (1-w_x) * (1-w_y) +
            tr * w_x * (1-w_y) +
            bl * (1-w_x) * w_y +
            br * w_x * w_y
        ).astype(np.uint8)
    
    print(f"Output shape: {output.shape}")
    
    return output

@app.post("/transform")
async def transform_image(
    file: UploadFile = File(...),
    points: str = Form(...)
):
    print("\nReceived transform request")
    print(f"Points received: {points}")
    
    # Read and process image
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    img_array = np.array(image)
    height, width = img_array.shape[:2]
    
    print(f"Image dimensions: {width}x{height}")
    
    # Parse points
    points = json.loads(points)
    if len(points) != 4:
        return {"error": "Exactly 4 points are required"}
    
    # Convert points to numpy array and order them
    src_pts = order_points(np.array(points))
    
    # Create destination points for rectangular output
    dst_width = width
    dst_height = height
    dst_pts = np.array([
        [0, 0],
        [dst_width-1, 0],
        [dst_width-1, dst_height-1],
        [0, dst_height-1]
    ], dtype=np.float32)
    
    # Compute and apply homography
    H = compute_homography(src_pts, dst_pts)
    transformed_img = apply_homography(img_array, H, dst_width, dst_height)
    
    # Convert to bytes
    transformed_pil = Image.fromarray(transformed_img)
    buf = io.BytesIO()
    transformed_pil.save(buf, format="JPEG", quality=95)
    byte_im = buf.getvalue()
    
    return {"image": byte_im.hex()}