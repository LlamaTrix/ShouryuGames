/**
 * Handling audio output with Web Audio.
 */
function Audio() {
  var self = this;
  this.muted = false;

  var audioContext = AudioContext || webkitAudioContext;

  if(audioContext === undefined)
    throw new Error('This browser seems not to support AudioContext.');

  this.bufferLength = 4096;
  this.buffer = new Float32Array(this.bufferLength);
  this.bufferIndex = 0;

  this.context = new audioContext();
  this.scriptProcessor = this.context.createScriptProcessor(this.bufferLength, 0, 1);

  this.scriptProcessor.onaudioprocess = function(e) {
    self.onAudioProcess(e);
  };

  this.scriptProcessor.connect(this.context.destination);
  this.sampleRate = this.context.sampleRate;
}

Object.assign(Audio.prototype, {
  isAudio: true,

  /**
   * Get the sample rate of the audio context.
   */toggleMute: function() {
    this.muted = !this.muted;
  },

  getSampleRate: function() {
    return this.sampleRate;
  },

  /**
   * Handle the audio processing.
   */
  onAudioProcess: function(e) {
    var data = e.outputBuffer.getChannelData(0);

    for(var i = 0, il = this.bufferLength; i < il; i++)
      data[i] = this.muted ? 0 : this.buffer[i]; 

    for(var i = this.bufferIndex, il = this.bufferLength; i < il; i++)
      data[i] = 0.0;

    this.bufferIndex = 0;
  },

  /**
   * Push audio data to the buffer.
   */
  push: function(data) {
    if(this.bufferIndex >= this.bufferLength)
      return;

    this.buffer[this.bufferIndex++] = data;
  }
});

export {Audio};
