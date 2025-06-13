# AI-TO-SCRIPT GENERATOR

A powerful Angular application that generates professional scripts using AI and provides voice synthesis capabilities for listening to your generated content.

LIVE-DEMO
https://sparkly-bienenstitch-ae3bf3.netlify.app/

## 🚀 Features

### Core Functionality
- **AI-Powered Script Generation**: Create professional scripts for presentations, videos, podcasts, speeches, and tutorials
- **Voice Synthesis**: Listen to your generated scripts with high-quality text-to-speech technology
- **Multiple Script Types**: Support for various content formats and presentation styles
- **Customizable Settings**: Adjust tone, duration, target audience, and voice parameters
- **Export Options**: Download scripts or copy to clipboard for easy sharing

### Voice Features
- **Multi-Voice Support**: Choose from available system voices
- **Playback Controls**: Play, pause, stop functionality with real-time progress tracking
- **Voice Customization**: Adjust speech rate, pitch, and volume
- **Progress Visualization**: Visual progress bar showing current reading position
- **Text Highlighting**: Real-time highlighting of currently spoken text

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Real-time Feedback**: Loading states and progress indicators
- **Accessibility**: Support for keyboard navigation and screen readers

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 20.0.0
- **Language**: TypeScript 5.8.2
- **Styling**: CSS3 with modern design patterns
- **Icons**: Font Awesome 6.0.0
- **Fonts**: Inter font family
- **APIs**: Web Speech API for voice synthesis
- **Build Tool**: Angular CLI with Webpack

## 📋 Prerequisites

Before running this application, ensure you have:

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Modern web browser with Web Speech API support
- Internet connection for external resources (fonts, icons)

## 🚀 Installation & Setup

1. **Clone or download the project files**
   ```bash
   # If using git
   git clone <repository-url>
   cd ai-script-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:4200`
   - The application will automatically reload when you make changes

## 🎯 How to Use

### Generating Scripts

1. **Enter Your Topic**
   - Provide a clear, specific topic for your script
   - Examples: "Artificial Intelligence in Healthcare", "Climate Change Solutions", "Digital Marketing Strategies"

2. **Choose Script Type**
   - **Presentation**: Formal business or academic presentations
   - **YouTube Video**: Engaging video content with hooks and calls-to-action
   - **Podcast Episode**: Conversational, narrative-style content
   - **Public Speech**: Formal speeches for events or ceremonies
   - **Tutorial/How-to**: Step-by-step instructional content

3. **Set Parameters**
   - **Duration**: Adjust the slider for desired script length (1-60 minutes)
   - **Tone**: Select from Professional, Casual, Educational, or Entertaining
   - **Target Audience**: Describe who will be consuming your content

4. **Generate Script**
   - Click "Generate AI Script" and wait for the AI to create your content
   - Generation typically takes 2-4 seconds

### Using Voice Features

1. **Voice Selection**
   - Choose from available system voices
   - Different voices may support different languages and accents

2. **Customize Playback**
   - **Speed**: Adjust reading rate (0.5x to 2.0x)
   - **Pitch**: Modify voice pitch (0.5 to 2.0)
   - Volume is automatically set to maximum for clarity

3. **Playback Controls**
   - **Play/Pause**: Start or pause audio playback
   - **Stop**: Stop playback and reset position
   - **Progress Bar**: Visual indicator of reading progress

4. **Export Options**
   - **Copy**: Copy script text to clipboard
   - **Download**: Save as .txt file with metadata
   - **Share**: Use native sharing (if supported) or copy to clipboard

## 🏗️ Project Structure

```
src/
├── components/
│   ├── script-form.component.ts       # Form for script generation parameters
│   └── script-display.component.ts    # Display and voice controls for generated scripts
├── services/
│   ├── script-generator.service.ts    # AI script generation logic
│   └── speech.service.ts              # Text-to-speech functionality
├── main.ts                            # Main application component and bootstrap
├── global_styles.css                  # Global CSS styles and design system
└── index.html                         # Application entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Linear gradient from #667eea to #764ba2
- **Secondary**: Rgba white overlays for glass morphism effect
- **Accent**: #FFD700 (Gold) for highlights and icons
- **Success**: #4CAF50 for positive actions
- **Text**: #333 for primary text, #666 for secondary

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
- **Line Heights**: 1.6 for body text, 1.2 for headings

### Components
- **Cards**: Glass morphism with backdrop blur
- **Buttons**: Multiple variants with hover animations
- **Form Controls**: Consistent styling with focus states
- **Responsive Grid**: CSS Grid with auto-fit columns

## 🔧 Configuration

### Angular Configuration
The project uses Angular 20 with:
- Standalone components architecture
- TypeScript strict mode
- Modern build system with Vite-style optimizations
- Tree-shaking for optimal bundle size

### Browser Compatibility
- **Recommended**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Voice Features**: Requires Web Speech API support
- **Fallbacks**: Graceful degradation for unsupported features

## 🚀 Build & Deployment

### Development Build
```bash
npm start
# Runs on http://localhost:4200 with hot reload
```

### Production Build
```bash
npm run build
# Creates optimized build in dist/demo/
```

### Build Output
- Optimized JavaScript bundles with tree-shaking
- Compressed CSS with unused code elimination
- Static assets copied to output directory
- Source maps for debugging (development only)

## 🔍 Features Deep Dive

### AI Script Generation
The application simulates AI script generation with:
- **Template System**: Pre-written, high-quality templates for each script type
- **Dynamic Content**: Incorporates user input (topic, tone, audience) into templates
- **Realistic Timing**: Simulated processing time for authentic experience
- **Quality Content**: Professional-grade script templates for various use cases

### Voice Synthesis Implementation
- **Web Speech API**: Native browser text-to-speech functionality
- **Voice Detection**: Automatic discovery of available system voices
- **Quality Prioritization**: Prefers high-quality voices (Google, Microsoft)
- **Real-time Controls**: Live adjustment of playback parameters
- **Progress Tracking**: Character-level position tracking with visual feedback

### Responsive Design
- **Mobile-First**: Optimized for small screens with touch-friendly controls
- **Flexible Grid**: CSS Grid with automatic column adjustment
- **Touch Gestures**: Swipe-friendly interface elements
- **Performance**: Optimized for various device capabilities

## 🛠️ Development

### Adding New Script Types
1. Update the `ScriptRequest` interface in `script-generator.service.ts`
2. Add new templates to the `getScriptTemplates` method
3. Update the form options in `script-form.component.ts`

### Customizing Voice Options
1. Modify `SpeechOptions` interface in `speech.service.ts`
2. Add new controls to `script-display.component.ts`
3. Update the UI to reflect new options

### Styling Modifications
1. Global styles are in `src/global_styles.css`
2. Component-specific styles are embedded in component files
3. Use CSS custom properties for consistent theming

## 🔒 Security & Privacy

- **Client-Side Processing**: All script generation happens locally
- **No Data Collection**: No user data is sent to external servers
- **Browser Storage**: Uses local browser capabilities only
- **Secure Assets**: External resources loaded over HTTPS

## 🐛 Troubleshooting

### Voice Not Working
- Ensure your browser supports Web Speech API
- Check if system voices are available
- Try different voice selections
- Verify audio permissions in browser settings

### Script Generation Issues
- Check console for error messages
- Ensure all form fields are properly filled
- Try refreshing the page if generation seems stuck

### Performance Issues
- Close other browser tabs to free memory
- Disable browser extensions that might interfere
- Try using a different browser

## 📈 Future Enhancements

- **Real AI Integration**: Connect with actual AI services (OpenAI, Anthropic)
- **Voice Cloning**: Custom voice generation capabilities
- **Multi-language Support**: Scripts and voices in multiple languages
- **Collaboration Features**: Share and collaborate on scripts
- **Advanced Analytics**: Script performance and engagement metrics

## 📝 License

This project is created for demonstration purposes. Feel free to use, modify, and distribute as needed.

## 🤝 Contributing

While this is a demonstration project, suggestions and improvements are welcome:

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:
- Check the troubleshooting section above
- Review browser console for error messages
- Ensure all prerequisites are met
- Try the application in different browsers

---

**Built with ❤️ using Angular and modern web technologies**
