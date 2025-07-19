# Publication Images

This directory contains figures and images for academic publications.

## Image Guidelines

### File Naming Convention
- Use descriptive names that match your publication
- Include the year for easy identification
- Examples:
  - `topology-bio-2024.jpg`
  - `deep-learning-cell-2024.jpg`
  - `medical-cnn-2021.jpg`
  - `protein-folding-2021.jpg`

### Image Specifications
- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 400-600px width
- **Aspect Ratio**: 16:9 or 4:3 preferred
- **File Size**: Keep under 500KB for fast loading

### Types of Publication Images
- **Graphical abstracts**: Visual summary of the research
- **Key figures**: Main results or methodology diagrams
- **System diagrams**: Architecture or workflow illustrations
- **Data visualizations**: Charts, graphs, or network diagrams

## Adding Images

1. **Save your image** in this directory with a descriptive name
2. **Update the JSON file** in `data/publications/[year].json`:
   ```json
   {
     "title": "Your Paper Title",
     "image": "assets/images/publications/your-image-name.jpg",
     "doi": "10.1000/journal.example"
   }
   ```
3. **Image will display** automatically alongside DOI badges

## Fallback Behavior
If an image file is missing or fails to load, the publication will display normally without the image (graceful degradation).

## Example Structure
```
assets/images/publications/
├── README.md (this file)
├── topology-bio-2024.jpg
├── deep-learning-cell-2024.jpg
├── medical-cnn-2021.jpg
└── protein-folding-2021.jpg
``` 