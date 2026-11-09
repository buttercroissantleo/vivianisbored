# vivianisbored

Static website recreated from the supplied Figma Design file, including home, about, work, and blog at desktop, tablet, and mobile sizes. No installation or build step is required.

## Preview

Open `index.html` in a browser, or run `python3 -m http.server 4173` from this folder and visit http://localhost:4173. A local server is recommended for navigation between directory URLs.

## Upload to GitHub Pages

1. Create a GitHub repository or open the repository you want to use.
2. Upload the contents of this folder into the repository root, preserving the `assets`, `aboutpage`, `workpage`, and `blogpage` folders. Do not upload the ZIP itself.
3. In the repository's Settings → Pages, choose deployment from a branch, select your branch and `/ (root)`, then save.
4. GitHub will provide the published URL. All internal paths are relative, so repository subdirectories are supported.
5. To connect vivianisbored.com later, configure it as the custom domain in Pages and follow GitHub's DNS instructions. This project does not change your existing live site or DNS.

## Editing

- `index.html`: homepage text, drawing, and navigation.
- `aboutpage/index.html`, `workpage/index.html`, `blogpage/index.html`: page content.
- `styles.css`: original layout positions and responsive breakpoints.
- `assets/thisisatv.png`: original image downloaded from Figma.
- `assets/fonts/GeneralSans-Medium.woff2`: locally hosted General Sans Medium from Fontshare (Indian Type Foundry). See https://www.fontshare.com/fonts/general-sans and https://www.fontshare.com/licenses/itf-free-font-license.

The 1080px canvas height, empty space, narrow text columns, and duplicate desktop blog social link are intentional design details. Desktop starts at 1024px, tablet at 600px, and mobile below 600px. Exact reference widths are 1280, 800, and 375px. Coincident duplicate text layers are rendered once, and off-canvas copies are omitted. Work/blog line breaks are explicit to preserve the reference wrapping across browsers.

Homepage navigation opens each page; underlined page titles link back home. The @vivianisbored links are wired to the Instagram account of that name. No new visible navigation has been added.
