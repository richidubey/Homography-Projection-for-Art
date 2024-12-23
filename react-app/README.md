# Homography Projection for Art

Homography Projection for Art is a web application that allows users to select points on an image, compute homography transformations, and visualize the transformed image. The project is built using a React frontend and a FastAPI backend, hosted on GitHub Pages (frontend) and Render (backend).

---

## Features

- Select 4 points on an image to define a quadrilateral.
- Compute homography transformations to project the selected region.
- View the transformed image in real-time.
- Backend service for computing homography transformations using FastAPI.
- Fully containerized for local development and deployment using Docker.

---

## Tech Stack

- **Frontend**: React.js with Material-UI and Fabric.js
- **Backend**: FastAPI, NumPy, and Pillow
- **Hosting**:
  - TBD.
- **Containerization**: Docker and Docker Compose

---

## Installation and Setup

### Prerequisites

- Node.js and npm
- Python 3.10+
- Docker (optional for containerized setup)

### Clone the Repository

```bash
git clone https://github.com/<your-username>/homography-app.git
cd homography-app
