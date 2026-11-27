# Term3D

For now its working using a simple JavaScript website.
But the goal is to make it work in a terminal, using only ASCII characters.

Start the server with the following command:
```bash
python3 -m http.server
```

References:
- [Computer Graphics from Scratch, Gabriel Gambetta](https://gabrielgambetta.com/computer-graphics-from-scratch/)

Rendering architecture:
- `src/canvas/` contains the canvas shared by renderers, using centered coordinates with y pointing up.
- `src/math/` contains vectors and matrices, including 4x4 matrices in homogeneous coordinates.
- `src/scene/` and `src/lighting/light.js` contain scene data shared by renderers, including models, their instances (position, rotation, scale) and the camera transform.
- `src/models/` contains the models, described as vertices and triangles.
- `src/raytracing/` contains the ray tracing renderer and its ray generation, intersection, and shading algorithms.
- `src/rasterization/` contains the rasterization renderer, its line and triangle drawing algorithms (wireframe, filled and shaded), the perspective projection of 3D vertices onto the canvas and the rendering of model instances seen by the camera.
- `src/pages/` builds the scene of each tab and renders it with its renderer.
- `src/ui/` contains the tabs, scene previews and object list; these are not rendering backends.
