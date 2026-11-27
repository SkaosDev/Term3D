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
- `src/scene/` and `src/lighting/light.js` contain scene data shared by renderers.
- `src/raytracing/` contains the ray tracing renderer and its ray generation, intersection, and shading algorithms.
- `src/rasterization/` contains the rasterization renderer and its line drawing algorithm.
- `src/pages/` builds the scene of each tab and renders it with its renderer.
- `src/ui/` contains the tabs, scene previews and object list; these are not rendering backends.
