# Academic Portfolio Website

A modern, responsive personal website template designed for academics, researchers, and educators. This template includes sections for research, teaching, publications, blog posts, and professional collaboration opportunities.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Single Page Application**: Smooth navigation between sections
- **Research Portfolio**: Dedicated sections for projects, publications, and community involvement
- **Teaching Section**: Showcase your courses and teaching philosophy
- **Blog Integration**: Share your thoughts and insights
- **Contact Form**: Professional contact information and inquiry form
- **Business Cooperation**: Highlight collaboration opportunities
- **SEO Ready**: Optimized for search engines

## Sections Included

1. **Home** - Welcome message and site overview
2. **News** - Latest scientific updates and announcements
3. **Bio** - Detailed personal and professional biography
4. **Research** - With subsections for:
   - Projects
   - Articles/Publications
   - Community Involvement
5. **Teaching** - Current courses (2024/2025 @ UKSW)
6. **Business** - Professional collaboration opportunities
7. **Blog** - Personal blog posts and insights
8. **Contact** - Contact information and inquiry form

## Quick Start

### For GitHub Pages Deployment

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Save the settings

2. **Your site will be available at**: `https://[username].github.io/[repository-name]`

### Customization Guide

#### 1. Personal Information
Replace the placeholder content in `index.html`:

- **Name**: Replace `[Your Name]` with your actual name
- **Title**: Update the page title and hero section
- **Bio**: Fill in your detailed biography in the Bio section
- **Contact Info**: Update email, phone, address, and social links
- **Institution**: Replace `[Your University]`, `[Your Department]`, etc.

#### 2. Research Content
- **Projects**: Add your research projects in the Research → Projects tab
- **Publications**: List your papers in the Research → Articles tab
- **Community**: Update editorial work, conferences, and memberships

#### 3. Teaching Information
- **Courses**: Update the course cards with your actual courses
- **Teaching Philosophy**: Write your personal teaching approach

#### 4. Business Services
- **Services**: Modify the service cards to reflect your expertise
- **Collaboration**: Update the business cooperation content

#### 5. Blog Posts
- **Posts**: Replace sample blog posts with your actual content
- **Links**: Update links to point to your actual blog posts

#### 6. Styling Customization
Edit `styles.css` to customize:
- **Colors**: Change the color scheme by updating CSS variables
- **Fonts**: Modify font families and sizes
- **Layout**: Adjust spacing, grid layouts, and responsive breakpoints

#### 7. Profile Photo
Replace the placeholder profile icon:
1. Add your photo to the repository
2. In `index.html`, replace the `.profile-placeholder` div with:
```html
<img src="your-photo.jpg" alt="Your Name" class="profile-image">
```
3. Add CSS for `.profile-image` in `styles.css`

## File Structure

```
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript for navigation and interactions
└── README.md           # This documentation
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Vanilla JS for interactions
- **Font Awesome**: Icons for social links and UI elements
- **Google Fonts**: Inter font family for clean typography

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Customization Tips

### Color Scheme
The primary color is blue (#3498db). To change it:
1. Search for `#3498db` in `styles.css`
2. Replace with your preferred color
3. Also update `#2980b9` (darker shade) for consistency

### Adding New Sections
1. Add a new section in `index.html`
2. Add corresponding navigation link
3. Update JavaScript navigation in `script.js`
4. Add styling in `styles.css`

### Form Handling
The contact form currently shows a success message. To make it functional:
1. Add a backend service (like Formspree, Netlify Forms, or custom server)
2. Update the form action in `initContactForm()` function
3. Handle actual form submission

## Performance Optimization

- **Images**: Optimize images before adding them
- **Fonts**: Only load necessary font weights
- **CSS**: Minify CSS for production
- **JavaScript**: Minify JavaScript for production

## Accessibility Features

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels where appropriate
- High contrast color scheme
- Responsive design for all devices

## License

This template is free to use for personal and academic purposes. Feel free to modify and customize it according to your needs.

## Support

If you encounter any issues or need help customizing the template, feel free to:
1. Check the existing issues in the repository
2. Create a new issue with your question
3. Refer to the HTML/CSS/JavaScript documentation

---

**Note**: Remember to replace all placeholder content with your actual information before publishing your site! 