import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SpeechOptions {
  rate: number;
  pitch: number;
  volume: number;
  voice?: SpeechSynthesisVoice;
}

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private speechSynthesis = window.speechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentPositionSubject = new BehaviorSubject<number>(0);
  private availableVoices: SpeechSynthesisVoice[] = [];

  isPlaying$ = this.isPlayingSubject.asObservable();
  currentPosition$ = this.currentPositionSubject.asObservable();

  constructor() {
    this.loadVoices();
    // Voices might load asynchronously
    if (this.speechSynthesis.onvoiceschanged !== undefined) {
      this.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  private loadVoices(): void {
    this.availableVoices = this.speechSynthesis.getVoices();
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.availableVoices;
  }

  speak(text: string, options: Partial<SpeechOptions> = {}): void {
    if (this.isPlayingSubject.value) {
      this.stop();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set default options
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    
    if (options.voice) {
      utterance.voice = options.voice;
    } else {
      // Try to use a high-quality voice
      const preferredVoice = this.availableVoices.find(voice => 
        voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.localService === false
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }

    utterance.onstart = () => {
      this.isPlayingSubject.next(true);
      this.currentPositionSubject.next(0);
    };

    utterance.onend = () => {
      this.isPlayingSubject.next(false);
      this.currentPositionSubject.next(0);
      this.currentUtterance = null;
    };

    utterance.onerror = (event) => {
      // Only log errors that are not intentional interruptions
      if (event.error !== 'interrupted') {
        console.error('Speech synthesis error:', event);
      }
      this.isPlayingSubject.next(false);
      this.currentUtterance = null;
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        this.currentPositionSubject.next(event.charIndex);
      }
    };

    this.currentUtterance = utterance;
    this.speechSynthesis.speak(utterance);
  }

  pause(): void {
    if (this.speechSynthesis.speaking && !this.speechSynthesis.paused) {
      this.speechSynthesis.pause();
      this.isPlayingSubject.next(false);
    }
  }

  resume(): void {
    if (this.speechSynthesis.paused) {
      this.speechSynthesis.resume();
      this.isPlayingSubject.next(true);
    }
  }

  stop(): void {
    if (this.speechSynthesis.speaking || this.speechSynthesis.paused) {
      this.speechSynthesis.cancel();
      this.isPlayingSubject.next(false);
      this.currentPositionSubject.next(0);
      this.currentUtterance = null;
    }
  }

  isSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  getCurrentStatus(): { isPlaying: boolean; position: number } {
    return {
      isPlaying: this.isPlayingSubject.value,
      position: this.currentPositionSubject.value
    };
  }
}