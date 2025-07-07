def handle_message(message):
    if "kilimani" in message.lower():
        return "Yes, the Kilimani unit is still available for rent."
    return "Sorry, I didn't understand the request."
