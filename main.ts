import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ScriptFormComponent } from './components/script-form.component';
import { ScriptDisplayComponent } from './components/script-display.component';
import { ScriptGeneratorService, ScriptRequest, GeneratedScript } from './services/script-generator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ScriptFormComponent, ScriptDisplayComponent],
  template: `
    <div class="app-container">
      <!-- Header -->
      <header class="app-header">
        <div class="container">
          <h1 class="app-title">
            <i class="fas fa-robot"></i>
            AI-TO-SCRIPT GENERATOR
          </h1>
          <p class="app-subtitle">
            Generate professional scripts with AI and listen with voice synthesis
          </p>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <div class="container">
          <!-- Loading State -->
          <div *ngIf="isGenerating" class="loading-overlay">
            <div class="loading-content">
              <div class="loading-spinner"></div>
              <h3>AI is crafting your script...</h3>
              <p>This may take a few moments while we generate high-quality content</p>
              <div class="loading-tips">
                <p><i class="fas fa-lightbulb"></i> Tip: The more specific your topic, the better the result!</p>
              </div>
            </div>
          </div>

          <!-- Script Form -->
          <div *ngIf="!generatedScript && !isGenerating" class="form-section">
            <app-script-form 
              (scriptGenerated)="onScriptRequested($event)">
            </app-script-form>
            
            <!-- Features Section -->
            <div class="features-section">
              <h2>What makes our AI Script Generator special?</h2>
              <div class="features-grid">
                <div class="feature-card">
                  <i class="fas fa-brain"></i>
                  <h3>AI-Powered</h3>
                  <p>Advanced algorithms create engaging, contextually relevant scripts tailored to your needs.</p>
                </div>
                <div class="feature-card">
                  <i class="fas fa-volume-up"></i>
                  <h3>Voice Synthesis</h3>
                  <p>Listen to your scripts with high-quality text-to-speech technology and customizable voice settings.</p>
                </div>
                <div class="feature-card">
                  <i class="fas fa-palette"></i>
                  <h3>Multiple Styles</h3>
                  <p>Choose from various tones and formats - presentations, videos, podcasts, and more.</p>
                </div>
                <div class="feature-card">
                  <i class="fas fa-download"></i>
                  <h3>Export Ready</h3>
                  <p>Download your scripts or copy them directly to use in your favorite applications.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Generated Script Display -->
          <div *ngIf="generatedScript && !isGenerating" class="script-section">
            <app-script-display 
              [script]="generatedScript">
            </app-script-display>
            
            <div class="text-center mt-4">
              <button class="btn btn-primary" (click)="startOver()">
                <i class="fas fa-plus mr-2"></i>
                Generate Another Script
              </button>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h4>AI-to-Script Generator</h4>
              <p>Empowering creators with AI-generated content and voice synthesis technology.</p>
            </div>
            <div class="footer-section">
              <h4>Features</h4>
              <ul>
                <li>Multi-format script generation</li>
                <li>Voice synthesis playback</li>
                <li>Customizable tone and style</li>
                <li>Export and sharing options</li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Support</h4>
              <p>Built with modern web technologies for the best user experience.</p>
              <div class="tech-badges">
                <span class="tech-badge">Angular</span>
                <span class="tech-badge">TypeScript</span>
                <span class="tech-badge">Web Speech API</span>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2025 AI-to-Script Generator. Crafted with ❤️ for creators.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding: 40px 0;
      text-align: center;
      color: white;
    }

    .app-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 16px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .app-title i {
      margin-right: 16px;
      color: #FFD700;
    }

    .app-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      font-weight: 300;
    }

    .main-content {
      flex: 1;
      padding: 60px 0;
      position: relative;
    }

    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(102, 126, 234, 0.95);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      color: white;
    }

    .loading-content {
      text-align: center;
      max-width: 400px;
    }

    .loading-content h3 {
      margin: 24px 0 16px;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .loading-content p {
      margin-bottom: 32px;
      opacity: 0.9;
    }

    .loading-tips {
      background: rgba(255, 255, 255, 0.1);
      padding: 16px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .loading-tips i {
      color: #FFD700;
      margin-right: 8px;
    }

    .form-section {
      max-width: 600px;
      margin: 0 auto;
    }

    .script-section {
      max-width: 900px;
      margin: 0 auto;
    }

    .features-section {
      margin-top: 60px;
      text-align: center;
      color: white;
    }

    .features-section h2 {
      font-size: 2rem;
      margin-bottom: 40px;
      font-weight: 600;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
      margin-top: 40px;
    }

    .feature-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 32px 24px;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    .feature-card i {
      font-size: 2.5rem;
      color: #FFD700;
      margin-bottom: 20px;
    }

    .feature-card h3 {
      font-size: 1.3rem;
      margin-bottom: 16px;
      font-weight: 600;
    }

    .feature-card p {
      line-height: 1.6;
      opacity: 0.9;
    }

    .app-footer {
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 50px 0 20px;
      color: white;
      margin-top: auto;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      margin-bottom: 40px;
    }

    .footer-section h4 {
      font-size: 1.2rem;
      margin-bottom: 16px;
      font-weight: 600;
      color: #FFD700;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section li {
      margin-bottom: 8px;
      opacity: 0.8;
    }

    .tech-badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 16px;
    }

    .tech-badge {
      background: rgba(255, 255, 255, 0.1);
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .footer-bottom {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      opacity: 0.7;
    }

    @media (max-width: 768px) {
      .app-title {
        font-size: 2rem;
      }
      
      .app-subtitle {
        font-size: 1rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }
      
      .footer-content {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      
      .tech-badges {
        justify-content: center;
      }
    }
  `]
})
export class App implements OnInit {
  generatedScript: GeneratedScript | null = null;
  isGenerating = false;

  constructor(private scriptGeneratorService: ScriptGeneratorService) {}

  ngOnInit() {
    console.log('AI-to-Script Generator initialized');
  }

  onScriptRequested(request: ScriptRequest): void {
    this.isGenerating = true;
    this.generatedScript = null;

    this.scriptGeneratorService.generateScript(request).subscribe({
      next: (script) => {
        this.generatedScript = script;
        this.isGenerating = false;
      },
      error: (error) => {
        console.error('Script generation failed:', error);
        this.isGenerating = false;
        alert('Sorry, there was an error generating your script. Please try again.');
      }
    });
  }

  startOver(): void {
    this.generatedScript = null;
    this.isGenerating = false;
  }
}

bootstrapApplication(App);