package com.hereexplore.features.navigation.engines

import android.content.Context
import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.util.Log
import java.util.Locale

/**
 * A helper class that uses Android's TextToSpeech engine to speak navigation instructions.
 */
class VoiceAssistant(
  context: Context,
  private var messageId: Int = 0,
  private var utteranceId: String? = null
) {

  private val textToSpeech: TextToSpeech = TextToSpeech(context.applicationContext) { status ->
    if (status == TextToSpeech.ERROR) {
      Log.d(TAG, "ERROR: Initialization of Android's TextToSpeech failed.")
    } else {
      Log.d(TAG, "TextToSpeech engine initialized successfully")
    }
  }

  /**
   * Set the language for the TTS engine
   */
  fun setLanguage(locale: Locale): Boolean {
    val isLanguageSet = textToSpeech.isLanguageAvailable(locale) == TextToSpeech.LANG_AVAILABLE
    if (isLanguageSet) {
      textToSpeech.language = locale
      Log.d(TAG, "Language set to: $locale")
    } else {
      Log.d(TAG, "Failed to set language to: $locale")
    }
    return isLanguageSet
  }

  /**
   * Speak the provided text message using the TTS engine
   */
  fun speak(speechMessage: String) {
    Log.d(TAG, "Voice message: $speechMessage")

    // No engine specific params for this implementation
    val engineParams: Bundle? = null
    utteranceId = TAG + messageId++

    // QUEUE_FLUSH interrupts already speaking messages
    val error = textToSpeech.speak(speechMessage, TextToSpeech.QUEUE_FLUSH, engineParams, utteranceId)
    if (error == TextToSpeech.ERROR) {
      Log.e(TAG, "Error when speaking using Android's TextToSpeech")
    }
  }

  /**
   * Check if the specified language is available in the TTS engine
   */
  fun isLanguageAvailable(locale: Locale): Boolean {
    return textToSpeech.isLanguageAvailable(locale) == TextToSpeech.LANG_AVAILABLE
  }

  /**
   * Clean up resources when the assistant is no longer needed
   */
  fun shutdown() {
    textToSpeech.stop()
    textToSpeech.shutdown()
  }

  companion object {
    private const val TAG = "VoiceAssistant"
  }
}
