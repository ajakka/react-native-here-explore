import AVFoundation
import Foundation

// A simple TTS engine that uses Apple's AVSpeechSynthesizer to speak texts.
class VoiceAssistant {
    private let avSpeechSynthesizer = AVSpeechSynthesizer()
    private var locale = Locale(identifier: "en-US")
    
    func isLanguageAvailable(locale: Locale) -> Bool {
        return isLanguageAvailable(identifier: locale.identifier)
    }
    
    func isLanguageAvailable(identifier: String) -> Bool {
        let supportedVoices = AVSpeechSynthesisVoice.speechVoices()
        for aVSpeechSynthesisVoice in supportedVoices {
            if aVSpeechSynthesisVoice.language == identifier {
                return true
            }
        }
        
        return false
    }
    
    func setLanguage(locale: Locale) -> Bool {
        if isLanguageAvailable(locale: locale) {
            self.locale = locale
            return true
        }
        
        print("Apple's AVSpeechSynthesisVoice does not support this language: \(locale). Keeping \(self.locale).")
        return false
    }
    
    func speak(message: String) {
        print("Voice message: \(message)")
        
        let voiceMessage = AVSpeechUtterance(string: message)
        voiceMessage.voice = AVSpeechSynthesisVoice(language: locale.identifier)
        if voiceMessage.voice == nil {
            print("Error: Apple's AVSpeechSynthesisVoice does not support this language: \(locale).")
            return
        }
        
        if avSpeechSynthesizer.isSpeaking {
            avSpeechSynthesizer.stopSpeaking(at: .immediate)
        }
        
        avSpeechSynthesizer.speak(voiceMessage)
    }
} 