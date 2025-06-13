import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScriptRequest } from '../services/script-generator.service';

@Component({
  selector: 'app-script-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2 class="text-center mb-4">
        <i class="fas fa-robot mr-2"></i>
        AI Script Generator
      </h2>
      
      <form (ngSubmit)="onSubmit()" #scriptForm="ngForm">
        <div class="form-group">
          <label for="topic" class="form-label">
            <i class="fas fa-lightbulb mr-2"></i>
            What's your topic?
          </label>
          <input
            id="topic"
            name="topic"
            type="text"
            class="form-control"
            placeholder="e.g., Artificial Intelligence, Climate Change, Digital Marketing..."
            [(ngModel)]="scriptRequest.topic"
            required
            #topicInput="ngModel"
          />
          <div *ngIf="topicInput.invalid && topicInput.touched" class="error-message">
            Please enter a topic for your script.
          </div>
        </div>

        <div class="form-group">
          <label for="type" class="form-label">
            <i class="fas fa-video mr-2"></i>
            Script Type
          </label>
          <select
            id="type"
            name="type"
            class="form-control"
            [(ngModel)]="scriptRequest.type"
            required
          >
            <option value="presentation">Presentation</option>
            <option value="video">YouTube Video</option>
            <option value="podcast">Podcast Episode</option>
            <option value="speech">Public Speech</option>
            <option value="tutorial">Tutorial/How-to</option>
          </select>
        </div>

        <div class="form-group">
          <label for="duration" class="form-label">
            <i class="fas fa-clock mr-2"></i>
            Duration (minutes)
          </label>
          <input
            id="duration"
            name="duration"
            type="range"
            min="1"
            max="60"
            class="form-control"
            [(ngModel)]="scriptRequest.duration"
          />
          <div class="duration-display">
            {{scriptRequest.duration}} minute{{scriptRequest.duration !== 1 ? 's' : ''}}
          </div>
        </div>

        <div class="form-group">
          <label for="tone" class="form-label">
            <i class="fas fa-palette mr-2"></i>
            Tone & Style
          </label>
          <select
            id="tone"
            name="tone"
            class="form-control"
            [(ngModel)]="scriptRequest.tone"
            required
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual & Friendly</option>
            <option value="educational">Educational</option>
            <option value="entertaining">Entertaining</option>
          </select>
        </div>

        <div class="form-group">
          <label for="audience" class="form-label">
            <i class="fas fa-users mr-2"></i>
            Target Audience
          </label>
          <textarea
            id="audience"
            name="audience"
            class="form-control"
            placeholder="Describe your target audience (e.g., business professionals, students, general public...)"
            [(ngModel)]="scriptRequest.audience"
            rows="3"
          ></textarea>
        </div>

        <div class="text-center mt-4">
          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="!scriptForm.form.valid || isGenerating"
          >
            <i class="fas fa-magic mr-2"></i>
            <span *ngIf="!isGenerating">Generate AI Script</span>
            <span *ngIf="isGenerating">
              <i class="fas fa-spinner fa-spin mr-2"></i>
              Generating Script...
            </span>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .duration-display {
      text-align: center;
      margin-top: 8px;
      font-weight: 500;
      color: #667eea;
    }

    .error-message {
      color: #e74c3c;
      font-size: 12px;
      margin-top: 4px;
    }

    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      height: 6px;
      background: linear-gradient(to right, #667eea, #764ba2);
      border-radius: 3px;
      outline: none;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: #667eea;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }

    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: #667eea;
      border-radius: 50%;
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }

    h2 {
      color: #333;
      font-weight: 600;
    }

    .fas {
      color: #667eea;
    }
  `]
})
export class ScriptFormComponent {
  @Output() scriptGenerated = new EventEmitter<ScriptRequest>();
  
  isGenerating = false;
  
  scriptRequest: ScriptRequest = {
    topic: '',
    type: 'presentation',
    duration: 5,
    tone: 'professional',
    audience: ''
  };

  onSubmit(): void {
    if (this.isGenerating) return;
    
    this.isGenerating = true;
    this.scriptGenerated.emit(this.scriptRequest);
    
    // Reset generating state after a delay
    setTimeout(() => {
      this.isGenerating = false;
    }, 4000);
  }
}