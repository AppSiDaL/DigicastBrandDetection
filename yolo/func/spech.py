def spechRecognition(url,keywords):
    from utils.video import extract_audio
    import speech_recognition as sr

    print("initiating speech recognition")
    r = sr.Recognizer()
    AUDIO_FILE, title = extract_audio(url, "youtube")
    with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)
    try:
        spech = r.recognize_google(audio, language="es-MX")
        spech = spech.lower()
        print(spech)
        results = []
        for word in keywords:
            if word in spech:
                results.append("bimbo")
        results = {"title": title, "spech": spech, "results": results}

        return results
    except sr.UnknownValueError:
        print("Sphinx could not understand audio")
    except sr.RequestError as e:
        print("Sphinx error; {0}".format(e))
