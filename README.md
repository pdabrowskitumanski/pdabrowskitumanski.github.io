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

### Local Testing

#### Option 1: Simple HTTP Server (Recommended)
To test locally with full JSON functionality, run a simple HTTP server:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js:**
```bash
npx http-server
```

**PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

#### Option 2: Direct File Opening (Limited)
You can open `index.html` directly in your browser, but due to CORS restrictions, the JSON files won't load. However, the site includes embedded fallback data so all content will still display correctly.

#### CORS and File Protocol
When opening HTML files directly (`file://` protocol), browsers block loading external JSON files for security reasons. The website handles this gracefully by:
- Detecting the `file://` protocol
- Automatically falling back to embedded data
- Displaying all content without any missing functionality
- Logging helpful console messages for debugging

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
├── index.html                           # Main HTML file with all sections
├── styles.css                           # Complete CSS styling
├── script.js                            # JavaScript for navigation and interactions
├── data/                                # Content data directory
│   ├── publications/                    # Publications organized by year
│   │   ├── 2023-2025.json              # Recent publications
│   │   ├── 2021.json                   # 2021 publications
│   │   ├── 2015-2019.json              # Mid-career publications
│   │   └── 2013.json                   # Early career publications
│   ├── blog/                           # Blog content
│   │   ├── posts.json                  # Blog posts metadata
│   │   └── content/                    # Individual blog post content
│   │       └── future-topology-research.md  # Sample blog post
│   ├── news.json                       # Scientific news and updates
│   ├── teaching/                       # Teaching content
│   │   ├── teaching.json               # Teaching metadata and course list
│   │   └── courses/                    # Individual course content
│   │       └── advanced-topology-2024.md  # Sample course page
│   └── projects.json                   # Research projects
└── README.md                           # This documentation
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

## Content Management

### Publications Management

Publications are stored in separate JSON files by year in the `data/publications/` directory. This modular approach makes it easy to add new publications without editing the main HTML file.

#### Adding New Publications

1. **Choose the appropriate year file** (e.g., `data/publications/2023-2025.json`)
2. **Add your publication** to the `publications` array:

```json
{
  "title": "Your Paper Title",
  "authors": ["Your Name", "Co-author 1", "Co-author 2"],
  "journal": "Journal Name",
  "year": "2024",
  "doi": "10.1000/journal.example.2024",
  "pdf_url": "https://link-to-pdf.com",
  "code_url": "https://github.com/yourusername/project",
  "abstract": "Brief description of your research...",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
```

3. **Create a new year file** if needed by copying the structure from existing files

#### Publication Fields
- `title`: Paper title (required)
- `authors`: Array of author names (required) - use "Your Name" for highlighting
- `journal`: Journal or venue name (required)
- `year`: Publication year (required)
- `doi`: DOI identifier (optional) - enables Altmetric and Dimensions badges
- `pdf_url`: Link to PDF (optional)
- `code_url`: Link to code repository (optional)
- `image`: Path to publication figure/image (optional) - e.g., "assets/images/publications/paper-2024.jpg"
- `abstract`: Brief description (optional)
- `keywords`: Array of keywords for tagging (optional)

#### DOI Badges & Publication Images

Publications now support:
- **Altmetric badges**: Automatically generated from DOI using `data-badge-type='donut'`
- **Dimensions badges**: Citation metrics using `data-style='small_circle'`
- **Publication figures**: Images displayed alongside each publication

**DOI Format Examples:**
```json
{
  "doi": "10.1038/s41467-024-12345",     // Nature Communications
  "doi": "10.1109/TMI.2021.12345",      // IEEE Transactions
  "doi": "10.1016/j.cell.2024.12345",   // Cell journal
  "doi": "10.1103/PhysRevLett.130.12345" // Physical Review Letters
}
```

**Image Setup:**
1. Create directory: `assets/images/publications/`
2. Add images with descriptive names: `topology-paper-2024.jpg`
3. Reference in JSON: `"image": "assets/images/publications/topology-paper-2024.jpg"`

**Required Scripts:**
The following scripts are automatically included for DOI badges:
- Dimensions: `https://badge.dimensions.ai/badge.js`
- Altmetric: `https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js`

### Blog Management

Blog posts are managed through two files:
- `data/blog/posts.json`: Contains metadata for all posts
- `data/blog/content/`: Contains individual markdown files with full content

#### Adding New Blog Posts

1. **Add metadata** to `data/blog/posts.json`:

```json
{
  "id": "unique-post-id",
  "title": "Your Blog Post Title",
  "date": "2024-03-15",
  "excerpt": "Brief excerpt for the blog listing...",
  "content": "data/blog/content/unique-post-id.md",
  "tags": ["tag1", "tag2", "tag3"],
  "featured": false,
  "read_time": "5 min read"
}
```

2. **Create content file** in `data/blog/content/unique-post-id.md`:

```markdown
# Your Blog Post Title

*Published on March 15, 2024*

Your full blog post content in markdown format...

## Subheading

Content with **bold** and *italic* text.

- Bullet points
- Are supported

```python
# Code blocks work too
def example():
    return "Hello, World!"
```

## Conclusion

Your thoughts and insights...
```

#### Blog Post Fields
- `id`: Unique identifier (required)
- `title`: Post title (required)
- `date`: Publication date in YYYY-MM-DD format (required)
- `excerpt`: Brief summary for listings (required)
- `content`: Path to markdown file (required)
- `tags`: Array of tags (optional)
- `featured`: Boolean for featured posts (optional)
- `read_time`: Estimated reading time (optional)

### Dynamic Loading Features

- **Automatic Loading**: Publications and blog posts load automatically when the page loads
- **Fallback Support**: If JSON files fail to load, the system gracefully falls back to static content
- **Full-Text Blog Posts**: Clicking "Read more" opens posts in an elegant modal with full markdown rendering
- **Responsive Design**: All dynamic content is fully responsive and mobile-friendly
- **Search-Friendly**: Content is loaded dynamically but remains accessible to search engines

### News Management

News items are stored in `data/news.json` and automatically categorized by type.

#### Adding News Items

Add news to `data/news.json`:

```json
{
  "id": "unique-news-id",
  "date": "2024-03-15",
  "title": "News Title",
  "description": "Brief description of the news item...",
  "link": "#research-articles",
  "type": "publication",
  "featured": true
}
```

#### News Fields
- `id`: Unique identifier (required)
- `date`: Date in YYYY-MM-DD format (required)
- `title`: News headline (required)
- `description`: Brief description (required)
- `link`: Link to relevant section or external URL (optional)
  - **Internal links**: Use `#section-id` (e.g., `#contact`, `#research`)
  - **Research tabs**: Use `#research-[tab-name]` (e.g., `#research-articles`, `#research-funding`)
  - **External links**: Use full URL (e.g., `https://example.com`) - opens in new tab with icon
- `type`: Category - publication, conference, funding, collaboration, award (required)
- `featured`: Boolean for highlighting important news (optional)

#### Link Examples
```json
// Internal navigation
{"link": "#contact"}              // → Scrolls to Contact section
{"link": "#research-articles"}    // → Opens Research, activates Articles tab
{"link": "#research-funding"}     // → Opens Research, activates Funding tab

// External links (open in new tab)
{"link": "https://journal.com/paper"}
{"link": "mailto:researcher@university.edu"}
{"link": "https://conference.org/proceedings"}
```

### Teaching Management

Teaching content is structured similarly to blog posts, with each course having its own detailed page. Course metadata is stored in `data/teaching/teaching.json` and detailed course content is stored in individual markdown files.

#### Course Structure

Teaching content is organized with:
- `data/teaching/teaching.json`: Course metadata and general teaching information
- `data/teaching/courses/`: Individual course content files (markdown)

```json
{
  "teaching": {
    "intro": "Teaching introduction text...",
    "philosophy": "Your teaching philosophy...",
    "supervision": {
      "phd_students": 3,
      "master_students": 5,
      "undergraduate_projects": 8
    },
    "teaching_awards": [
      {
        "title": "Award Name",
        "institution": "Institution", 
        "year": "2023"
      }
    ]
  },
  "courses": [
    {
      "id": "course-id-2024",
      "title": "Course Title",
      "level": "Graduate",
      "semester": "Fall 2024",
      "year": "2024/2025",
      "institution": "UKSW",
      "description": "Brief course description...",
      "credits": 3,
      "students": 15,
      "schedule": "Tuesdays & Thursdays, 10:00-11:30 AM",
      "room": "Building, Room 205",
      "content": "data/teaching/courses/course-id-2024.md",
      "status": "current",
      "featured": true,
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

#### Adding New Courses

1. **Add course metadata** to `data/teaching/teaching.json`:

```json
{
  "id": "unique-course-id",
  "title": "Course Name",
  "level": "Graduate",
  "semester": "Spring 2025",
  "year": "2024/2025",
  "institution": "UKSW",
  "description": "Brief description...",
  "credits": 3,
  "students": 20,
  "schedule": "Days & Times",
  "room": "Location",
  "content": "data/teaching/courses/course-id.md",
  "status": "current",
  "featured": false,
  "tags": ["relevant", "tags"]
}
```

2. **Create course content file** in `data/teaching/courses/course-id.md`:

```markdown
# Course Name
## Semester Year | Level Course | X Credits

**Instructor:** Dr. [Your Name]  
**Schedule:** Days & Times  
**Location:** Room Information  
**Students:** X enrolled  

## Course Overview

Detailed course description and overview...

## Learning Objectives

- Objective 1
- Objective 2
- Objective 3

## Prerequisites

- Prerequisite 1
- Prerequisite 2

## Assessment

| Component | Weight | Description |
|-----------|--------|-------------|
| Homework | 30% | Weekly assignments |
| Midterm | 25% | In-class examination |
| Final Project | 30% | Research project |
| Final Exam | 15% | Comprehensive exam |

## Course Schedule

### Week 1: Topic 1
- Lecture content
- Reading assignments

### Week 2: Topic 2
- Lecture content
- Homework due

## Contact Information

**Email:** [your.email@institution.edu]  
**Office Hours:** Days & Times  
```

#### Course Fields

- `id`: Unique identifier (required)
- `title`: Course name (required)
- `level`: "Undergraduate" or "Graduate" (required)
- `semester`: "Fall 2024", "Spring 2025", etc. (required)
- `year`: Academic year (required)
- `institution`: University/Institution (required)
- `description`: Brief course description (required)
- `credits`: Number of credits (required)
- `students`: Number of enrolled students (required)
- `schedule`: Class meeting times (required)
- `room`: Classroom location (required)
- `content`: Path to markdown file (required)
- `status`: "current", "upcoming", or "past" (required)
- `featured`: Boolean for highlighting important courses (optional)
- `tags`: Array of relevant tags (optional)

#### Course Features

- **Interactive Course Cards**: Click to view detailed course information
- **Course Modal**: Full course syllabus and information in elegant modal
- **Status Indicators**: Visual indicators for current, upcoming, and past courses
- **Featured Courses**: Highlight important or flagship courses
- **Responsive Design**: Works perfectly on all devices
- **Markdown Support**: Rich content formatting for course materials
```

### Projects Management

Research projects are stored in `data/projects.json` with detailed information about each project.

#### Project Structure

```json
{
  "id": "project-id",
  "title": "Project Title",
  "duration": "2020 - Present",
  "status": "active",
  "description": "Brief project description...",
  "detailed_description": "Detailed project information...",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "funding": "Grant information",
  "collaborators": ["Dr. Name 1", "Dr. Name 2"],
  "publications": 4,
  "github_repo": "https://github.com/username/repo",
  "website": "https://project-website.com",
  "key_achievements": [
    "Achievement 1",
    "Achievement 2",
    "Achievement 3"
  ]
}
```

#### Project Fields
- `id`: Unique identifier (required)
- `title`: Project name (required)
- `duration`: Time period (required)
- `status`: "active" or "completed" (required)
- `description`: Brief description (required)
- `detailed_description`: Extended description (optional)
- `tags`: Array of relevant tags (optional)
- `funding`: Grant or funding information (optional)
- `collaborators`: Array of collaborator names (optional)
- `publications`: Number of publications (optional)
- `github_repo`: Repository URL (optional)
- `website`: Project website URL (optional)
- `key_achievements`: Array of major accomplishments (optional)

### Dynamic Loading Features

- **Comprehensive Coverage**: News, teaching, projects, publications, and blog posts all load dynamically
- **Automatic Fallback**: If JSON files fail to load, embedded data ensures content always displays
- **Smart Detection**: Automatically detects `file://` protocol and uses embedded data
- **Visual Feedback**: Success notifications confirm when content loads
- **Enhanced Styling**: Each section has specialized styling for its content type
- **Mobile Optimized**: All dynamic sections work perfectly on mobile devices

### Benefits of This Approach

1. **Easy Maintenance**: Add new content by simply editing JSON files
2. **Version Control**: Track changes to individual publications and posts
3. **Collaboration**: Multiple people can contribute content without conflicts
4. **Performance**: Main HTML file stays lightweight
5. **Flexibility**: Easy to add new fields or change structure
6. **Backup**: Content is separated from code, making backups simpler
7. **Consistency**: All sections follow the same modular pattern
8. **Scalability**: Easy to add new sections or modify existing ones

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