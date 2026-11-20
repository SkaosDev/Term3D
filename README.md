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
- `src/scene/` and `src/lighting/light.js` contain scene data shared by renderers.
- `src/raytracing/` contains the ray tracing renderer and its ray generation, intersection, and shading algorithms.
- `src/ui/` contains the scene preview and object list; these are not rendering backends.
