# 📜 Thirukkural & Bhagavad Gita AI Chatbot

Welcome to the **Thirukkural & Bhagavad Gita AI Chatbot**! This project is a conversational AI-powered assistant that fetches relevant verses from **Thirukkural** and **Bhagavad Gita**, providing insightful explanations, translations, and engaging short stories.

---

## 🚀 Features

✅ **Intelligent Query Handling** - Finds relevant verses based on user input and past conversation context.\
✅ **Thirukkural & Bhagavad Gita Support** - Retrieves and explains Tamil Thirukkural and Sanskrit Bhagavad Gita verses.\
✅ **Multi-Language Translation** - Supports translations in Tamil, Hindi, Malayalam, Telugu, Bengali, Gujarati, Kannada, Marathi, Punjabi, and Urdu.\
✅ **Conversational Memory** - Retains chat history for better contextual understanding.\
✅ **Modern-Day Stories** - Provides relatable short stories to explain the moral of each verse.\
✅ **Seamless API Integration** - Uses **Google Gemini AI** and **Azure Translator API** for advanced AI responses and multilingual support.\
✅ **Web Interface** - Interactive web-based UI using Flask and HTML.

---

## 🛠️ Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **AI Models**: LangChain + Google Gemini AI
- **Translation**: Azure Translator API
- **Chat History**: LangChain's ChatMessageHistory
- **Environment Management**: dotenv
- **Logging**: Python logging module

---

## 📦 Installation & Setup

1️⃣ Clone the repository:

```sh
$ git clone https://github.com/your-username/thirukkural-gita-chatbot.git
$ cd thirukkural-gita-chatbot
```

2️⃣ Install dependencies:

```sh
$ pip install -r requirements.txt
```

3️⃣ Set up environment variables:
Create a `.env` file and add the following:

```env
GOOGLE_API_KEY=your_google_gemini_api_key
AZURE_TRANSLATOR_KEY=your_azure_translator_api_key
AZURE_TRANSLATOR_ENDPOINT=your_azure_endpoint
```

4️⃣ Run the application:

```sh
$ python app.py
```

5️⃣ Access the web interface:
Open a browser and visit:

```
http://localhost:5000
```

---

## 🌍 Deployment

The chatbot is deployed and accessible at:
👉 [Sacred Text Chatbot](https://sacredtext-chatbot.onrender.com)

---

## 🎯 API Endpoints

🔹 **Query for a verse**

```http
POST /query
```

**Body:**

```json
{
  "query": "What does the Bhagavad Gita say about duty?"
}
```

🔹 **Translate a response**

```http
POST /translate
```

**Body:**

```json
{
  "text": "This is the meaning of the verse.",
  "explanation": "Detailed explanation here.",
  "story": "Short story illustrating the verse.",
  "language": "ta"
}
```

🔹 **Clear chat history**

```http
POST /clear_history
```

---

## 📌 To-Do List

✅ Add more contextual memory improvements.\
✅ Optimize response times.\
✅ Improve UI for a better user experience.\
✅ Develop an interactive web-based chat UI.\
&#x20;✅ Expand to include more religious and philosophical texts.

---

## 🤝 Contributing

Feel free to fork this repo, suggest improvements, and contribute to this amazing project!

---

## 📝 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

🚀 *Let the wisdom of ancient texts guide your modern journey!* ✨

