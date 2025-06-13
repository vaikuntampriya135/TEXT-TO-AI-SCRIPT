import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeneratedScript } from '../services/script-generator.service';
import { SpeechService, SpeechOptions } from '../services/speech.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-script-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card script-container" *ngIf="script">
      <div class="script-header">
        <h2>
          <i class="fas fa-file-alt mr-2"></i>
          {{script.title}}
        </h2>
        <div class="script-meta">
          <span class="meta-item">
            <i class="fas fa-clock"></i>
            {{script.estimatedDuration}} min
          </span>
          <span class="meta-item">
            <i class="fas fa-font"></i>
            {{script.wordCount}} words
          </span>
          <span class="meta-item">
            <i class="fas fa-calendar"></i>
            {{script.generatedAt | date:'short'}}
          </span>
        </div>
      </div>

      <!-- Voice Controls -->
      <div class="voice-controls" *ngIf="speechService.isSupported()">
        <h3>
          <i class="fas fa-volume-up mr-2"></i>
          Voice Controls
        </h3>
        
        <div class="controls-row">
          <div class="voice-settings">
            <div class="setting-group">
              <label>Voice:</label>
              <select [(ngModel)]="selectedVoice" class="voice-select">
                <option [ngValue]="null">Default Voice</option>
                <option *ngFor="let voice of availableVoices" [ngValue]="voice">
                  {{voice.name}} ({{voice.lang}})
                </option>
              </select>
            </div>
            
            <div class="setting-group">
              <label>Speed: {{speechOptions.rate}}x</label>
              <input 
                type="range" 
                min="0.5" 
                max="2" 
                step="0.1" 
                [(ngModel)]="speechOptions.rate"
                class="range-slider"
              />
            </div>
            
            <div class="setting-group">
              <label>Pitch: {{speechOptions.pitch}}</label>
              <input 
                type="range" 
                min="0.5" 
                max="2" 
                step="0.1" 
                [(ngModel)]="speechOptions.pitch"
                class="range-slider"
              />
            </div>
          </div>
          
          <div class="playback-controls">
            <button 
              class="btn btn-success"
              [class.btn-secondary]="isPlaying"
              (click)="togglePlayback()"
            >
              <i class="fas" [class.fa-play]="!isPlaying" [class.fa-pause]="isPlaying"></i>
              {{isPlaying ? 'Pause' : 'Play'}}
            </button>
            
            <button 
              class="btn btn-secondary"
              (click)="stopPlayback()"
              [disabled]="!isPlaying"
            >
              <i class="fas fa-stop"></i>
              Stop
            </button>
          </div>
        </div>
        
        <div class="progress-bar" *ngIf="isPlaying || currentPosition > 0">
          <div class="progress-fill" [style.width.%]="getProgressPercentage()"></div>
          <div class="progress-text">
            {{getCurrentPositionText()}} / {{script.content.length}} characters
          </div>
        </div>
      </div>

      <!-- Script Content -->
      <div class="script-content">
        <h3>
          <i class="fas fa-scroll mr-2"></i>
          Generated Script
        </h3>
        
        <div class="script-text" [innerHTML]="getHighlightedContent()"></div>
      </div>

      <!-- Action Buttons -->
      <div class="script-actions">
        <button class="btn btn-primary" (click)="copyToClipboard()">
          <i class="fas fa-copy mr-2"></i>
          Copy Script
        </button>
        
        <button class="btn btn-secondary" (click)="downloadScript()">
          <i class="fas fa-download mr-2"></i>
          Download
        </button>
        
        <button class="btn btn-secondary" (click)="shareScript()">
          <i class="fas fa-share mr-2"></i>
          Share
        </button>
      </div>
    </div>

    <div class="no-support-message" *ngIf="!speechService.isSupported()">
      <i class="fas fa-exclamation-triangle"></i>
      Voice playback is not supported in your browser.
    </div>
  `,
  styles: [`
    .script-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .script-header h2 {
      color: #333;
      margin-bottom: 16px;
      font-weight: 600;
    }

    .script-meta {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 24px;
      padding: 16px;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 8px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      font-size: 14px;
    }

    .meta-item i {
      color: #667eea;
    }

    .voice-controls {
      margin-bottom: 32px;
      padding: 24px;
      background: rgba(118, 75, 162, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(118, 75, 162, 0.1);
    }

    .voice-controls h3 {
      color: #333;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .controls-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      align-items: start;
    }

    .voice-settings {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .setting-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .setting-group label {
      font-weight: 500;
      color: #555;
      font-size: 14px;
    }

    .voice-select {
      padding: 8px 12px;
      border: 2px solid #e1e5e9;
      border-radius: 6px;
      font-size: 14px;
    }

    .range-slider {
      -webkit-appearance: none;
      appearance: none;
      height: 6px;
      background: linear-gradient(to right, #667eea, #764ba2);
      border-radius: 3px;
      outline: none;
    }

    .range-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      background: #667eea;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
    }

    .playback-controls {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }

    .progress-bar {
      margin-top: 20px;
      position: relative;
      height: 24px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 12px;
      border: 1px solid rgba(102, 126, 234, 0.2);
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(45deg, #667eea, #764ba2);
      border-radius: 12px;
      transition: width 0.3s ease;
    }

    .progress-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 12px;
      font-weight: 500;
      color: #333;
      text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
    }

    .script-content {
      margin-bottom: 32px;
    }

    .script-content h3 {
      color: #333;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .script-text {
      background: #f8f9fa;
      padding: 24px;
      border-radius: 8px;
      line-height: 1.8;
      font-size: 16px;
      color: #333;
      white-space: pre-wrap;
      border: 1px solid #e9ecef;
    }

    .script-text .highlight {
      background: rgba(102, 126, 234, 0.2);
      padding: 2px 4px;
      border-radius: 3px;
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .script-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .no-support-message {
      text-align: center;
      padding: 20px;
      color: #e74c3c;
      background: rgba(231, 76, 60, 0.1);
      border-radius: 8px;
      margin: 20px 0;
    }

    @media (max-width: 768px) {
      .controls-row {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .script-meta {
        flex-direction: column;
        gap: 12px;
      }
      
      .script-actions {
        flex-direction: column;
      }
      
      .script-actions .btn {
        width: 100%;
      }
    }
  `]
})
export class ScriptDisplayComponent implements OnInit, OnDestroy {
  @Input() script: GeneratedScript | null = null;
  
  isPlaying = false;
  currentPosition = 0;
  availableVoices: SpeechSynthesisVoice[] = [];
  selectedVoice: SpeechSynthesisVoice | null = null;
  
  speechOptions: SpeechOptions = {
    rate: 1,
    pitch: 1,
    volume: 1
  };

  private subscriptions: Subscription[] = [];

  constructor(public speechService: SpeechService) {}

  ngOnInit(): void {
    this.availableVoices = this.speechService.getAvailableVoices();
    
    // Subscribe to speech service updates
    this.subscriptions.push(
      this.speechService.isPlaying$.subscribe(playing => {
        this.isPlaying = playing;
      }),
      this.speechService.currentPosition$.subscribe(position => {
        this.currentPosition = position;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.speechService.stop();
  }

  togglePlayback(): void {
    if (this.isPlaying) {
      this.speechService.pause();
    } else {
      if (this.speechService.getCurrentStatus().position > 0) {
        this.speechService.resume();
      } else {
        this.startSpeech();
      }
    }
  }

  stopPlayback(): void {
    this.speechService.stop();
  }

  private startSpeech(): void {
    if (!this.script) return;
    
    const options: Partial<SpeechOptions> = {
      ...this.speechOptions,
      voice: this.selectedVoice || undefined
    };
    
    this.speechService.speak(this.script.content, options);
  }

  getProgressPercentage(): number {
    if (!this.script) return 0;
    return (this.currentPosition / this.script.content.length) * 100;
  }

  getCurrentPositionText(): string {
    return this.currentPosition.toString();
  }

  getHighlightedContent(): string {
    if (!this.script) return '';
    
    if (this.currentPosition > 0 && this.isPlaying) {
      const before = this.script.content.substring(0, this.currentPosition);
      const current = this.script.content.substring(this.currentPosition, this.currentPosition + 50);
      const after = this.script.content.substring(this.currentPosition + 50);
      
      return `${this.escapeHtml(before)}<span class="highlight">${this.escapeHtml(current)}</span>${this.escapeHtml(after)}`;
    }
    
    return this.escapeHtml(this.script.content);
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  copyToClipboard(): void {
    if (!this.script) return;
    
    navigator.clipboard.writeText(this.script.content).then(() => {
      alert('Script copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  downloadScript(): void {
    if (!this.script) return;
    
    const content = `${this.script.title}\n\nGenerated: ${this.script.generatedAt}\nEstimated Duration: ${this.script.estimatedDuration} minutes\nWord Count: ${this.script.wordCount}\n\n${this.script.content}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.script.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  shareScript(): void {
    if (!this.script) return;
    
    if (navigator.share) {
      navigator.share({
        title: this.script.title,
        text: this.script.content.substring(0, 200) + '...',
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      this.copyToClipboard();
    }
  }
}