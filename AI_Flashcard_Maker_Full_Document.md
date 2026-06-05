# AI Flashcard Maker
### Graduation Project — Full Technical and Academic Document

**Team Members:**
- Abdulrahman Mohammed Zourob — Team Leader
- Ibrahim Salah Al Najjar

---

# Abstract

In today's fast-paced academic environment, students face an ever-growing challenge: processing and retaining large volumes of information within tight time constraints. Traditional study methods — reading, highlighting, and manually summarizing content — are increasingly insufficient for the demands of modern education. Among the most effective learning strategies validated by decades of cognitive science research is active recall using flashcards. However, the process of manually creating high-quality flashcards from raw educational material remains a significant barrier to adoption. Students must read, comprehend, filter, and reformulate knowledge into clear question-and-answer pairs — a cognitively demanding task that many find too time-consuming, especially before exams.

This project introduces the AI Flashcard Maker, a full-stack web application that removes this barrier entirely. The system allows a student to paste any educational text — a lecture excerpt, a textbook paragraph, a set of notes — and receive, within seconds, a complete set of well-structured, accurate, and interactive flashcards. The entire card creation process is automated by Artificial Intelligence, specifically through Large Language Models (LLMs): OpenAI's GPT-4o and Anthropic's Claude.

The AI pipeline is built using LangChain, a framework for constructing LLM-powered applications, and LangGraph, a library for defining stateful, multi-step AI reasoning workflows. Rather than relying on a single LLM call, the system runs the input text through a four-stage reasoning graph: the text is first analyzed for context and domain, then its key concepts are extracted, then structured flashcards are generated, and finally the output is validated for quality and completeness. This multi-step approach produces flashcards that are significantly more accurate, relevant, and well-formed than a naive single-prompt approach.

The backend is built in Python using FastAPI, a modern high-performance web framework. The database layer uses PostgreSQL, a robust, open-source relational database, with SQLAlchemy as the ORM. The frontend is a React application styled with TailwindCSS, featuring smooth three-dimensional card flip animations powered by Framer Motion.

User testing with fifteen university students demonstrated an average quality rating of 4.43 out of 5 for the generated flashcards and a measured time saving of approximately 97 percent compared to manual card creation. This document presents the complete academic and technical description of the project, including the motivation, literature review, AI tools and technologies, system architecture, database design, implementation methodology, testing results, and conclusions.

---

# Table of Contents

- Chapter 1: Introduction
  - 1.1 Background and Context
  - 1.2 Research Problem
  - 1.3 Research Questions
  - 1.4 Research Objectives
  - 1.5 Research Significance
  - 1.6 Scope and Limitations
  - 1.7 Summary

- Chapter 2: Literature Review
  - 2.1 Introduction
  - 2.2 The Cognitive Science of Flashcards and Active Recall
  - 2.3 Spaced Repetition and the Forgetting Curve
  - 2.4 Challenges with Manual Flashcard Creation
  - 2.5 Existing Digital Flashcard Platforms
  - 2.6 AI Applications in Educational Technology
  - 2.7 The Gap in Existing Solutions
  - 2.8 Related Work Comparison
  - 2.9 Summary

- Chapter 3: AI Technologies and Tools
  - 3.1 Introduction
  - 3.2 Artificial Intelligence and Natural Language Processing
  - 3.3 Large Language Models (LLMs)
  - 3.4 How Large Language Models Work
  - 3.5 OpenAI and GPT-4o
  - 3.6 Anthropic and Claude
  - 3.7 Comparing GPT-4o and Claude for This Project
  - 3.8 Prompt Engineering
  - 3.9 Structured Output and Schema Enforcement
  - 3.10 LangChain Framework
  - 3.11 LangGraph Framework
  - 3.12 Why LangChain and LangGraph Over Traditional NLP
  - 3.13 Summary

- Chapter 4: System Architecture and Design
  - 4.1 Overview
  - 4.2 Technology Stack
  - 4.3 High-Level System Architecture
  - 4.4 The AI Pipeline — LangGraph Workflow Design
  - 4.5 Backend Architecture — Python and FastAPI
  - 4.6 Frontend Architecture — React
  - 4.7 Security and Authentication Design
  - 4.8 Summary

- Chapter 5: Database Design
  - 5.1 Why PostgreSQL
  - 5.2 Database Architecture Overview
  - 5.3 Entity-Relationship Model
  - 5.4 Table Definitions and Field Descriptions
  - 5.5 Constraints and Data Integrity Rules
  - 5.6 Indexing Strategy
  - 5.7 Normalization Analysis
  - 5.8 Database Migration Strategy
  - 5.9 Summary

- Chapter 6: Implementation
  - 6.1 Development Workflow and Environment
  - 6.2 AI Pipeline Implementation
  - 6.3 Backend API Implementation
  - 6.4 Frontend Implementation
  - 6.5 Integration Between Layers
  - 6.6 Summary

- Chapter 7: Testing and Evaluation
  - 7.1 Testing Strategy
  - 7.2 Unit Testing
  - 7.3 Integration Testing
  - 7.4 Performance Testing
  - 7.5 User Acceptance Testing
  - 7.6 Evaluation Results
  - 7.7 Summary

- Chapter 8: Conclusion and Future Work
  - 8.1 Conclusion
  - 8.2 Challenges Encountered
  - 8.3 Future Work

- References

---

---

# Chapter 1: Introduction

## 1.1 Background and Context

The global expansion of higher education over the past two decades has placed unprecedented demands on students. Course curricula are denser, reading lists are longer, and the volume of information a student must absorb per semester has grown substantially. The traditional toolkit of study strategies — reading textbooks, attending lectures, taking notes, and reviewing summaries — remains largely unchanged despite this increase in academic load. Students are, in effect, being asked to process more information using the same cognitive tools that existed fifty years ago.

Parallel to this educational challenge, a technological revolution has been unfolding in the field of Artificial Intelligence. The development of Large Language Models (LLMs) — beginning with the GPT series from OpenAI, followed by models from Google, Meta, and Anthropic — has fundamentally redefined what computers can do with language. These models can read, understand, summarize, translate, explain, and generate text at a level that was considered impossible just a decade ago. They do not require custom training data or complex machine learning pipelines for each new task. They can be directed through natural language instructions — prompts — to perform a wide variety of intelligent language tasks.

This convergence of educational need and AI capability creates a compelling opportunity. If an AI system can understand a paragraph of educational content and reformulate it into clear, accurate question-and-answer pairs, it can eliminate one of the most time-consuming steps in the study process: creating flashcards. Flashcards are widely recognized by cognitive scientists as one of the most effective study tools available, leveraging the mechanisms of active recall and spaced repetition. Yet their adoption among students is limited precisely because creating good flashcards requires significant effort.

The AI Flashcard Maker is a response to this opportunity. It is a web-based platform built on modern AI technologies — OpenAI's GPT-4o and Anthropic's Claude, orchestrated through the LangChain and LangGraph frameworks — that allows any student to paste any educational text and receive a complete, interactive set of study flashcards within seconds. The application is not a simple wrapper around a single AI call. It runs the text through a structured, multi-step reasoning pipeline that analyzes the content, extracts the most important concepts, generates well-formed question-answer cards, and validates the output for quality before presenting it to the user.

The technical stack is modern and production-ready: a Python FastAPI backend, a PostgreSQL relational database, and a React frontend with smooth animations. Together, these components form a complete, deployable application that a student can realistically use every day as part of their study routine.

## 1.2 Research Problem

Despite the proliferation of digital learning tools over the past decade, a critical gap persists in the ecosystem of student study aids. The fundamental problem can be stated as follows:

Students spend a disproportionate amount of their limited study time creating study materials rather than actually studying them.

This problem manifests in several specific ways. First, manually creating flashcards from a textbook chapter or set of lecture notes requires the student to read the material, identify the key concepts, determine which concepts are testable, formulate a clear and specific question, and write a concise and accurate answer. This process requires a level of comprehension and metacognitive skill that many students, particularly at earlier stages of their education, struggle to apply consistently. The result is either an enormous investment of time or flashcards of poor quality — cards with vague questions, incomplete answers, or coverage that misses important concepts.

Second, existing digital flashcard platforms such as Anki and Quizlet, while excellent for the actual study experience, provide no assistance in the card creation phase. The student is still responsible for typing every card individually. The platform provides the container; the content is entirely the student's burden. Some platforms allow sharing of community-created decks, but these are often inconsistent in quality, may not match the specific textbook or course being studied, and may contain errors.

Third, general-purpose AI tools such as direct use of ChatGPT or Claude can generate flashcard-like content when prompted appropriately, but this requires the student to understand prompt engineering, manually copy and paste the output, and format it into a study tool themselves. The output is unstructured plain text, not a set of interactive cards in a ready-to-use study environment.

The core research problem is therefore: there exists no accessible, integrated, end-to-end system that automatically converts raw educational text into high-quality, structured flashcards and presents them in an interactive study environment — without requiring manual effort, prompt engineering knowledge, or technical skill from the student.

## 1.3 Research Questions

The development of the AI Flashcard Maker is guided by the following research questions:

1. How can Large Language Models be effectively prompted and orchestrated through a multi-step reasoning pipeline to reliably convert diverse educational texts into accurate and pedagogically sound question-and-answer flashcards?

2. How does the use of a structured, multi-stage LangGraph workflow — compared to a single prompt approach — affect the quality, accuracy, and relevance of the generated flashcards?

3. What database schema and data architecture best supports the features of a flashcard generation and review platform, including user management, deck organization, card storage, and session-level progress tracking?

4. How can the React frontend be designed to maximize usability and engagement, ensuring that the interactive review mode encourages consistent study habits?

5. What are the measurable differences in study preparation efficiency between students using the AI Flashcard Maker and those using traditional manual methods?

6. How do students assess the quality of AI-generated flashcards compared to cards they would create themselves?

## 1.4 Research Objectives

The primary objective of this research is to design, develop, and evaluate an intelligent, end-to-end flashcard generation system built on modern Large Language Model technology. The specific objectives are:

- To design a multi-step AI reasoning pipeline using LangChain and LangGraph that decomposes the flashcard generation task into discrete, observable, and quality-controlled stages.

- To integrate two state-of-the-art LLM providers — OpenAI GPT-4o and Anthropic Claude — through a unified interface that allows the system to switch between providers via configuration.

- To develop a robust Python FastAPI backend that exposes a clean REST API, handles user authentication with JWT tokens, and manages all data operations through a well-structured PostgreSQL database.

- To design a comprehensive PostgreSQL database schema that accurately models the entities of the system — users, decks, cards, and review sessions — with appropriate constraints, indexes, and relationships.

- To build a responsive and visually polished React frontend that provides a seamless user experience from text input through card generation, interactive review, and progress tracking.

- To implement a smooth three-dimensional flashcard flip animation using Framer Motion that enhances the study experience and makes the tool engaging to use.

- To evaluate the system through controlled user testing with real students, measuring flashcard quality, usability, and time efficiency gains.

## 1.5 Research Significance

The significance of this project can be understood from multiple perspectives.

From a student perspective, the tool directly addresses one of the most practical pain points of academic life. Time is the scarcest resource for most students. Any tool that reduces time spent on administrative study preparation — without sacrificing quality — has immediate, tangible value. The AI Flashcard Maker can reduce flashcard creation time from twenty to thirty minutes per chapter to under one minute, allowing students to redirect that time toward actual learning.

From an educational technology perspective, the project demonstrates a new paradigm for AI-assisted learning tools. Rather than using AI to replace the student's thinking (as a calculator replaces mental arithmetic), the system uses AI to handle the preparatory mechanical work of study material creation, while leaving the cognitive work of studying — retrieving, testing, and reinforcing knowledge — entirely to the student. This is a pedagogically sound approach that augments rather than circumvents learning.

From a software engineering perspective, the project serves as a reference implementation for a modern LLM-powered application architecture. The combination of LangChain for LLM abstraction, LangGraph for workflow orchestration, FastAPI for the backend, PostgreSQL for persistence, and React for the frontend represents a mature, production-grade stack that can be studied, extended, and adapted for other AI-powered applications.

From a research perspective, the project contributes to the growing body of work on applying LLMs to educational technology. The specific approach — using a multi-step LangGraph pipeline rather than a single prompt — is a methodological contribution that can be evaluated, replicated, and built upon by future researchers.

## 1.6 Scope and Limitations

### Scope of the Study

The scope of this project is defined as follows. The system accepts plain text as the primary input type, with no upper limit beyond the context window of the selected LLM model. This includes lecture notes, textbook paragraphs, article excerpts, or any other text-based educational content. The AI pipeline produces question-and-answer flashcards in English as the primary language, with support for other languages contingent on the multilingual capabilities of the selected LLM. The user interface supports creating, viewing, and studying flashcard decks, with session-level progress tracking including known and unknown card counts. The system includes user account management with registration, login, and JWT-based authentication. All data is persisted in a PostgreSQL database using a fully normalized relational schema.

### Limitations of the Study

Several limitations bound the scope of this project. The system's output quality is directly dependent on the quality of the input text. Poorly structured, extremely short, or highly ambiguous text may produce flashcards of lower accuracy or relevance. The system does not implement long-term spaced repetition scheduling such as the SM-2 algorithm used by Anki; progress tracking is session-based rather than longitudinal. The current implementation does not support PDF upload, image input, or audio content; input must be manually pasted plain text. The system depends on paid external LLM API services, which introduces both a running cost and a dependency on third-party availability. The evaluation of the system is based on a user testing group of fifteen students, which, while sufficient to draw meaningful conclusions, is not large enough to support broad statistical generalization.

## 1.7 Summary

This chapter established the foundation of the AI Flashcard Maker project by articulating the problem — the inefficiency and difficulty of manual flashcard creation — and the opportunity that modern Large Language Models create for solving it. The research questions, objectives, significance, and scope were defined to provide a clear framework for the rest of the document. Chapter 2 examines the existing research and tools that inform this work, Chapter 3 provides a deep technical explanation of the AI technologies used, and subsequent chapters cover the complete design, implementation, and evaluation of the system.

---

---

# Chapter 2: Literature Review

## 2.1 Introduction

A rigorous literature review must examine the theoretical foundations, existing tools, and prior research that together define the landscape into which the AI Flashcard Maker enters. This chapter is organized around three central pillars: the cognitive science that validates flashcards as a learning technique, the existing digital platforms that attempt to support flashcard-based study, and the AI research and technologies that make automated flashcard generation possible. By examining each of these areas, this chapter identifies the specific gaps in current knowledge and practice that the proposed system aims to fill.

## 2.2 The Cognitive Science of Flashcards and Active Recall

The effectiveness of flashcards as a study tool is not merely anecdotal. It is grounded in decades of rigorous experimental research in cognitive psychology. The key mechanism through which flashcards improve learning is known as the testing effect or retrieval practice effect. This phenomenon was described as early as 1909 by Pyle, who demonstrated that students who were tested on material retained it better than students who spent the equivalent time re-reading. The effect was further systematized and popularized by Roediger and Karpicke (2006), whose landmark study showed that students who practiced retrieval — actively trying to recall information — significantly outperformed students who restudied the same material, even after a one-week delay.

The cognitive mechanism behind this effect is understood in terms of memory encoding and retrieval strength. Each time information is successfully retrieved from long-term memory, the memory trace is strengthened and becomes more resistant to forgetting. The act of retrieval — even when it results in an incorrect answer — is more beneficial than passive exposure to the information. This is because the effort involved in retrieval, sometimes called desirable difficulty, promotes deeper processing of the material.

Flashcards are the most practical, accessible implementation of retrieval practice. Each card presents a cue — the question — and requires the learner to retrieve the associated information from memory before the answer is revealed. This maps directly onto the mechanism described above: the student sees the question, attempts to recall the answer, and then checks their recall against the card. The cycle of attempt-and-check is precisely the retrieval practice that the research demonstrates to be highly effective.

## 2.3 Spaced Repetition and the Forgetting Curve

Complementing the testing effect is the concept of spaced repetition, which is grounded in Hermann Ebbinghaus's foundational 1885 study of memory and forgetting. Ebbinghaus, studying his own memory of nonsense syllables, discovered what he called the forgetting curve: a mathematical model showing that memory decays exponentially over time following initial learning. The rate of forgetting is steep immediately after learning and gradually flattens over time, but without review, even well-learned material will eventually become inaccessible.

The solution Ebbinghaus proposed — and which has been validated by subsequent research — is spaced repetition: reviewing material at intervals that are timed to coincide with the point at which forgetting begins to occur. By reviewing information just before it would be forgotten, the learner reinforces the memory trace and extends the retention interval. Over time, with repeated spaced reviews, information can be retained indefinitely with decreasing review frequency.

Piotr Wozniak's SM-2 algorithm, developed in the late 1980s and implemented in the SuperMemo software, was the first practical digital implementation of spaced repetition. It assigns each card an interval based on the learner's self-assessed confidence in their recall. Cards that the learner finds difficult are reviewed more frequently; cards that the learner knows well are reviewed less frequently. The algorithm adapts to the individual learner's memory profile. The Anki software, released in 2006, brought this algorithm to a wide audience and has since become the most widely used digital flashcard platform globally.

The AI Flashcard Maker incorporates a simplified version of this insight through its Know/Don't Know review mechanism. While the current version does not implement the full SM-2 scheduling algorithm, the architecture is designed to support it as a future enhancement.

## 2.4 Challenges with Manual Flashcard Creation

Despite the scientific evidence supporting flashcard use, their adoption among students remains inconsistent. Research into study habits consistently identifies the time and effort required to create flashcards as the primary barrier. A study by Kornell and Bjork (2007) found that while students often acknowledged the effectiveness of retrieval practice, they consistently underinvested in it because of the upfront cost of preparation.

Creating good flashcards is itself a cognitively demanding task. The student must not only understand the material well enough to identify which concepts are most important, but also possess the metacognitive skill to formulate questions that genuinely test understanding rather than surface recognition. Poor flashcard creation — questions that are too vague, too broad, or that can be answered without understanding the underlying concept — undermines the effectiveness of the study technique. Many students, particularly those who are already struggling with the material, lack both the time and the metacognitive skill to create truly effective cards.

The problem is compounded by the sheer scale of modern course content. A single chapter of a university-level textbook may contain dozens of testable concepts. Creating a complete set of cards for an entire course represents a substantial investment of time — time that many students cannot afford.

## 2.5 Existing Digital Flashcard Platforms

A number of digital platforms have been developed to support flashcard-based studying. This section examines the most prominent ones and assesses their strengths and limitations in the context of the problem this project addresses.

**Anki** is the most technically sophisticated flashcard platform available. It implements the SM-2 spaced repetition algorithm with a high degree of customization, supports rich multimedia cards including images, audio, and mathematical notation, and has a large and active community that maintains a library of shared decks. However, Anki has significant limitations for the use case of automated card generation. The default card creation process is entirely manual. While Anki has a programming API and supports add-ons, using it for automated card generation requires significant technical expertise. The application's interface, while powerful, has a steep learning curve that many students find off-putting. Crucially, Anki provides no AI-powered content generation of any kind.

**Quizlet** is the most widely used digital flashcard platform among students, largely due to its ease of use and large library of community-shared decks. Students can create simple text or image flashcard sets quickly through a web or mobile interface. Quizlet has introduced some AI features in recent years, including a tool that can generate study questions from imported text, but this feature is limited to its premium subscription tier and produces content of variable quality. The core workflow still requires manual card creation. Additionally, Quizlet's terms of service prohibit programmatic access to its AI features, limiting its extensibility.

**Brainscape** uses a confidence-based repetition system where learners rate their confidence in each card on a scale of one to five. The platform is clean and well-designed but has no AI content generation capability. Like Anki and Quizlet, Brainscape requires students to create their own cards or purchase premium curated decks.

**Notion AI** is not a dedicated flashcard platform but is worth mentioning as an adjacent AI-powered tool. Notion's AI assistant can summarize notes, generate bullet points, and answer questions about document content. However, it does not generate structured flashcard pairs, does not provide a study mode, and does not offer any review or progress tracking. It represents the type of general-purpose AI tool that students might attempt to repurpose for flashcard creation but which falls short of an integrated solution.

**Direct use of ChatGPT or Claude** represents the most direct AI approach currently available to students. A sufficiently skilled student can write a prompt asking the LLM to generate flashcards from pasted text and receive a list of question-answer pairs. However, this requires the student to understand how to write effective prompts, the output is plain unformatted text with no study interface, there is no persistence or deck management, and there is no review mode. It is a manual, technically demanding, and incomplete solution.

## 2.6 AI Applications in Educational Technology

The application of artificial intelligence to education — a field known as Educational Technology or EdTech — has been an active research area for several decades. Early AI systems in education focused on rule-based intelligent tutoring systems (ITS), which modeled both the subject domain and the learner's knowledge state to provide personalized feedback. Carnegie Learning's Cognitive Tutor, developed in the 1990s, is a notable example. These systems were effective but required enormous effort to build: each domain required expert human knowledge engineers to manually encode the rules and domain model.

The advent of machine learning brought new capabilities to EdTech. Natural Language Processing (NLP) techniques were applied to problems such as automated essay scoring, reading comprehension assessment, and automatic question generation. These systems required large labeled datasets and trained models specific to each task and domain. Heilman's 2011 dissertation on automatic factual question generation demonstrated that it was possible to extract syntactic and semantic information from text and transform it into grammatically correct questions using rule-based and statistical methods. However, these systems were brittle, language-specific, and required substantial expertise to deploy.

The emergence of large pre-trained language models — BERT in 2018, GPT-2 in 2019, and GPT-3 in 2020 — transformed the landscape again. These models, trained on vast corpora of text, developed broad language understanding capabilities that could be applied to new tasks with minimal additional training (fine-tuning) or, in the case of the largest models, with no training at all (zero-shot and few-shot prompting). The educational implications were significant: for the first time, it was possible to build intelligent educational tools without building and training domain-specific models from scratch.

The period from 2022 onward, marked by the release of ChatGPT (based on GPT-3.5 and later GPT-4) and Google's Bard (based on PaLM and later Gemini), brought these capabilities to the general public. Research in AI-assisted education accelerated dramatically. Studies explored using LLMs for personalized tutoring, automated feedback on student writing, generation of practice problems, and explanation of difficult concepts. The quality of LLM output in educational contexts has been consistently rated highly by students and educators in user studies.

## 2.7 The Gap in Existing Solutions

A systematic review of both commercial products and academic research reveals a consistent gap. On one side are excellent, well-designed flashcard platforms (Anki, Quizlet) that provide outstanding study experiences but require entirely manual content creation. On the other side are powerful AI tools (ChatGPT, Claude) that can generate flashcard-like content but provide no study environment, no persistence, and no quality control. No existing, accessible product bridges these two sides into an integrated, end-to-end solution.

Furthermore, even the research literature on automatic question generation — which dates back to the early 2000s — has focused primarily on generating questions for assessment purposes (testing students) rather than for study purposes (helping students create revision materials). The requirements are subtly different: assessment questions must test specific learning outcomes defined by a curriculum, while study flashcards should cover the key concepts in a specific piece of text that the student has chosen to study.

The AI Flashcard Maker fills this specific gap: an accessible, integrated, end-to-end system that automatically converts student-supplied educational text into structured, interactive flashcards, with no manual effort required from the student and with a complete, polished study interface included.

## 2.8 Related Work Comparison

The following table provides a structured comparison of existing tools and the proposed system across the dimensions most relevant to the problem being solved.

| Feature | Anki | Quizlet | Direct ChatGPT Use | AI Flashcard Maker |
|---|---|---|---|---|
| Automatic card generation from text | No | Limited (premium) | Partial (manual prompt) | Yes — fully automated |
| Structured question-answer format | Manual | Manual | Unstructured text | Structured JSON parsed output |
| Multi-step AI reasoning pipeline | N/A | N/A | No | Yes — 4-node LangGraph graph |
| Interactive study mode with flip animation | Yes | Yes | No | Yes |
| Know / Don't Know review mechanism | Yes | Yes | No | Yes |
| Session-level progress tracking | Yes | Yes | No | Yes |
| Deck management and organization | Yes | Yes | No | Yes |
| User account and authentication | Yes | Yes | N/A | Yes |
| Open source and self-hostable | Yes | No | No | Yes |
| End-to-end integrated workflow | No | No | No | Yes |

## 2.9 Summary

The literature review has established the strong cognitive science foundation for flashcard-based study, documented the significant barrier of manual card creation, surveyed the limitations of existing digital platforms, traced the development of AI in education to the current era of Large Language Models, and identified the specific gap that the AI Flashcard Maker aims to fill. No existing tool provides the combination of automated, AI-powered card generation, quality-controlled output through a multi-step reasoning pipeline, and a complete interactive study environment in a single integrated application. The following chapter examines in depth the AI technologies and tools that make this system possible.

---

---

# Chapter 3: AI Technologies and Tools

## 3.1 Introduction

The AI Flashcard Maker is fundamentally an AI-powered application. Understanding the system at any meaningful level requires a thorough understanding of the AI technologies that drive it. This chapter provides that understanding. It begins with a broad introduction to Artificial Intelligence and Natural Language Processing, then narrows progressively to explain Large Language Models, the specific models used in this project (OpenAI GPT-4o and Anthropic Claude), the principles of prompt engineering that shape how those models are used, the concept of structured output and why it matters for reliability, and finally the two frameworks — LangChain and LangGraph — that orchestrate the entire AI pipeline.

The goal of this chapter is not merely to list technologies but to explain why each one was chosen, how it works at a conceptual level, and what specific role it plays in the AI Flashcard Maker system.

## 3.2 Artificial Intelligence and Natural Language Processing

Artificial Intelligence (AI) is the broad field of computer science concerned with creating systems that can perform tasks that typically require human intelligence. These tasks include reasoning, learning, problem-solving, perception, and understanding language. Within AI, Natural Language Processing (NLP) is the subfield concerned specifically with enabling computers to understand, interpret, and generate human language.

For much of its history, NLP relied on rule-based approaches: linguists and programmers manually encoded the grammatical rules, syntax structures, and semantic relationships of a language. These systems were limited by the complexity and ambiguity of natural language. Human language is context-dependent, metaphorical, culturally rich, and full of exceptions to every rule. Rule-based systems could handle narrow, well-defined tasks but broke down quickly in the face of real-world language diversity.

Statistical NLP, which emerged in the 1980s and 1990s, replaced many rules with probability models learned from large text corpora. Instead of encoding rules manually, statistical models learned the patterns of language from data. This approach was more robust and generalized better to new text. However, these models were still shallow — they captured statistical regularities in language without truly understanding meaning.

The deep learning revolution of the 2010s transformed NLP fundamentally. Neural networks, trained on enormous datasets, learned to represent language as high-dimensional numerical vectors that capture semantic relationships. Words and phrases with similar meanings have similar vector representations. This enabled machines to reason about language in ways that were qualitatively different from — and far more powerful than — statistical approaches.

The culmination of this trajectory is the current generation of Large Language Models, which represent the most capable natural language understanding and generation systems ever built.

## 3.3 Large Language Models (LLMs)

A Large Language Model is a type of artificial neural network trained on a massive corpus of text data to predict and generate language. The "large" in the name refers to the number of parameters in the model — the numerical weights that are adjusted during training. Modern LLMs have hundreds of billions of parameters, trained on trillions of words of text sourced from books, articles, websites, code repositories, and other written material.

The defining characteristic of an LLM is its ability to understand and generate text across an extraordinarily wide range of topics, styles, and tasks. An LLM does not have a single, fixed purpose. The same model can write poetry, answer factual questions, summarize documents, translate languages, generate computer code, analyze arguments, and perform many other language tasks — all without any task-specific training. It can do this because its training on vast amounts of diverse text has given it a rich, general understanding of language and knowledge.

LLMs operate by predicting the most likely continuation of a given input text. Given a sequence of text (called the "context" or "prompt"), the model predicts, token by token, what text should follow. A token is roughly equivalent to a word or a subword unit; most LLMs operate at the level of roughly 750 words per 1,000 tokens. The prediction is probabilistic — the model assigns a probability distribution over all possible next tokens and samples from that distribution. This process of sequential token prediction is how the model generates responses: each token is generated conditioned on all the tokens that came before it.

The key insight is that this seemingly simple mechanism — next-token prediction — over a sufficiently large model trained on sufficiently diverse data, gives rise to emergent capabilities far beyond simple text completion. The model develops an internal representation of grammar, facts, logic, reasoning patterns, and the structure of different types of text. It can follow instructions, maintain context over long conversations, and perform complex multi-step reasoning tasks.

## 3.4 How Large Language Models Work

### 3.4.1 The Transformer Architecture

Modern LLMs are based on the Transformer architecture, introduced by Vaswani et al. in 2017 in the paper "Attention is All You Need." The Transformer solved a key limitation of earlier recurrent neural network architectures: the inability to efficiently process long sequences of text while maintaining awareness of relationships between distant elements.

The core innovation of the Transformer is the self-attention mechanism. For each token in the input sequence, the attention mechanism computes a weighted sum of all other tokens in the sequence, where the weights reflect how "relevant" each token is to the current one. This allows the model to directly capture relationships between any two tokens in the sequence, regardless of their distance apart. A model reading the sentence "The student who aced the exam that the professor had designed studied every night" can directly connect "student" to "studied" even though they are far apart and separated by a complex clause.

The Transformer consists of multiple stacked layers of attention and feedforward transformations. Each layer refines the representation of the input tokens, progressively building a richer understanding of the text. The final layer's representation is used to predict the next token.

### 3.4.2 Pre-training

LLMs are trained in a process called pre-training, where the model is trained on a massive text corpus using the self-supervised objective of next-token prediction. Given a sequence of text, the model is trained to predict the next token. The loss (the difference between the predicted and actual next token) is computed and backpropagated through the network to update the model's parameters.

This process is repeated billions of times across trillions of tokens of text. The scale of pre-training is enormous: the compute required to train a frontier LLM costs tens to hundreds of millions of dollars and requires thousands of specialized GPU or TPU chips running for weeks or months.

### 3.4.3 Instruction Fine-tuning and RLHF

Raw pre-trained LLMs are good at completing text but not at following instructions or behaving helpfully in a conversational context. To make them useful as assistants, they undergo further training through a process called instruction fine-tuning, where the model is trained on a curated dataset of instruction-response pairs.

Additionally, most modern LLMs undergo Reinforcement Learning from Human Feedback (RLHF), a process in which human evaluators rate the model's responses on dimensions such as helpfulness, accuracy, and harmlessness. A separate "reward model" is trained to predict these human ratings, and the LLM is then fine-tuned using reinforcement learning to maximize the reward model's score. This process significantly improves the quality, coherence, and safety of the model's outputs.

### 3.4.4 Context Window

An LLM's context window is the maximum amount of text it can process in a single inference call — the combined length of the input (prompt) and the generated output. Early LLMs had context windows of a few thousand tokens. Modern frontier models have context windows of 128,000 tokens or more, sufficient to process entire books or lengthy technical documents in a single call. For the AI Flashcard Maker, the context window determines the maximum length of text that can be submitted for flashcard generation.

## 3.5 OpenAI and GPT-4o

OpenAI is an AI research company founded in 2015, initially as a nonprofit with a mission to ensure that artificial general intelligence benefits all of humanity. OpenAI developed the Generative Pre-trained Transformer (GPT) series of language models, which have been among the most influential AI systems of the past decade.

GPT-4o, released in May 2024, is OpenAI's most capable model at the time of this project's development. The "o" in GPT-4o stands for "omni," reflecting the model's multimodal capabilities: it can process and generate text, images, and audio. For the purposes of this project, its text capabilities are what matter.

GPT-4o offers several characteristics that make it particularly well-suited for the flashcard generation task. Its reasoning capabilities allow it to distinguish between primary and secondary information in a text, making it effective at the key concept extraction stage of the pipeline. Its instruction-following abilities are highly reliable, meaning that when given a structured prompt asking for a specific JSON format, it consistently produces well-formed output. Its knowledge is broad enough to accurately assess the factual content of educational texts across many academic domains.

From a technical integration standpoint, OpenAI provides a well-documented REST API and an official Python client library. The LangChain framework provides a further abstraction layer over this API, making it straightforward to integrate GPT-4o into a structured application pipeline. OpenAI's API also supports "structured outputs" — a feature where the model is constrained to produce output that conforms to a developer-defined JSON schema, virtually eliminating parsing errors.

GPT-4o pricing at the time of development is approximately 2.50 USD per million input tokens and 10.00 USD per million output tokens. For typical flashcard generation use (a few hundred to a few thousand tokens of input text and a hundred to three hundred tokens of output), each generation request costs on the order of a fraction of a US cent, making the system economically viable for regular student use.

## 3.6 Anthropic and Claude

Anthropic is an AI safety company founded in 2021 by former OpenAI researchers, including Dario and Daniela Amodei. Anthropic's primary product is the Claude series of large language models, designed with a specific emphasis on safety, reliability, and honesty. Anthropic's approach to AI safety centers on a technique called Constitutional AI (CAI), in which the model is trained to follow a set of explicitly defined principles that guide its behavior.

Claude 3.5 Sonnet, the model from Anthropic's lineup used in this project, is a highly capable model that offers a favorable balance of intelligence, speed, and cost. It excels in tasks that require careful reasoning, nuanced understanding of context, and consistent instruction-following — all of which are important for the flashcard generation task.

A distinctive feature of Claude is its particularly large context window of 200,000 tokens — nearly twice that of GPT-4o — making it especially well-suited for processing very long educational texts, such as multiple chapters of a textbook, in a single API call. Claude also tends to produce more conservative, factually grounded responses, which is advantageous for a system where accuracy is critical: a flashcard with a wrong answer is worse than no flashcard at all.

The LangChain framework supports Claude through the langchain-anthropic integration package, providing the same unified interface used for GPT-4o. This means the AI Flashcard Maker can switch between GPT-4o and Claude simply by changing a configuration variable, with no changes to the pipeline logic.

## 3.7 Comparing GPT-4o and Claude for This Project

Both GPT-4o and Claude are excellent choices for the flashcard generation task, and the system is designed to support both. The following table summarizes the key differences as they relate to this project's requirements.

| Dimension | OpenAI GPT-4o | Anthropic Claude 3.5 Sonnet |
|---|---|---|
| Context window | 128,000 tokens | 200,000 tokens |
| JSON structured output enforcement | Native API support | Supported via LangChain |
| Factual accuracy | Very high | Very high |
| Instruction following | Excellent | Excellent |
| Speed | Fast | Fast |
| Cost per million input tokens | 2.50 USD | 3.00 USD |
| Cost per million output tokens | 10.00 USD | 15.00 USD |
| API maturity | Very mature | Mature |
| LangChain support | Full | Full |

In practice, either model produces high-quality flashcards for most educational texts. GPT-4o's native structured output enforcement makes it marginally more reliable for ensuring clean JSON output. Claude's larger context window makes it preferable for very long text inputs. The system defaults to GPT-4o for most requests, with Claude available as an alternative provider selectable by the user.

## 3.8 Prompt Engineering

Prompt engineering is the practice of designing the natural language instructions — prompts — given to a Large Language Model in order to elicit accurate, reliable, and appropriately formatted responses. It is both a technical discipline and an art. The same underlying model can produce radically different outputs depending on how the prompt is written, and the difference between a well-engineered prompt and a poorly designed one can be the difference between a useful application and an unreliable one.

For the AI Flashcard Maker, prompt engineering is critical because the system depends on the LLM consistently producing structured, well-formed output. There are several principles of effective prompt engineering that guide the design of the prompts in this system.

**Clarity and specificity.** Each prompt provides a clear, unambiguous description of the task. Rather than asking the model to "make flashcards," the prompt specifies exactly what a flashcard is, what format it should take, and what constraints apply. For example, the generator prompt explicitly defines the rules for question formulation: questions must be specific, answers must be concise, yes/no questions should be avoided.

**Role assignment.** LLMs perform better when assigned a specific role or persona. Each prompt in the pipeline begins by assigning the model a relevant expert role — "You are an expert educational content analyzer" for the analyzer prompt, "You are an expert flashcard creator for university students" for the generator prompt. This primes the model to approach the task with the appropriate perspective and vocabulary.

**Output format specification.** Each prompt explicitly specifies the required output format. For nodes in the pipeline that need structured data, the prompt includes a precise description of the JSON schema expected in the response. Examples are provided where helpful. This dramatically increases the probability that the model's output can be parsed programmatically without errors.

**Context provision.** Later nodes in the pipeline receive the outputs of earlier nodes as part of their context. The flashcard generator, for example, receives both the original text and the list of key concepts extracted by the previous node. This contextual enrichment allows each node to make more informed decisions than it could from the raw input alone.

**Temperature control.** Temperature is a parameter that controls the randomness of the LLM's output. A temperature of 0 produces deterministic output; higher values introduce more variability and creativity. For flashcard generation, where accuracy and consistency are more important than creativity, a low temperature of 0.2 to 0.3 is used. This reduces the likelihood of the model producing hallucinated or inconsistent content.

## 3.9 Structured Output and Schema Enforcement

One of the most important technical challenges in building reliable LLM-powered applications is ensuring that the model's output can be reliably parsed and used by the rest of the application. In a conversational context, human-readable plain text is acceptable. But in an application pipeline where the LLM's output must be processed programmatically — stored in a database, displayed in a UI component, passed to another function — the output must conform to a precise format.

Both OpenAI and Anthropic have addressed this challenge at the API level. OpenAI's structured outputs feature, introduced in 2024, allows developers to provide a JSON schema as part of the API request. The model is then constrained by the API to produce output that strictly conforms to that schema. If the model would naturally produce output that violates the schema, it is corrected before being returned to the caller. This means that the application can always rely on receiving valid, schema-conformant JSON.

LangChain extends this capability through its output parser system. When a LangChain chain is configured with a Pydantic model as its output schema using the `.with_structured_output()` method, LangChain automatically generates the appropriate schema specification for the underlying API, sends the request with schema enforcement enabled, and parses the raw API response into a validated Python Pydantic object. The application code then works directly with strongly typed Python objects rather than raw JSON strings, eliminating an entire class of potential runtime errors.

In the AI Flashcard Maker, each node in the LangGraph pipeline uses this mechanism. The analyzer node produces a TextAnalysis Pydantic object, the extractor produces a ConceptList object, the generator produces a FlashcardSet object, and the validator operates on the typed flashcard data. The use of Pydantic throughout ensures that data integrity is maintained as information flows through the pipeline.

## 3.10 LangChain Framework

LangChain is an open-source framework released in October 2022 by Harrison Chase. It was developed specifically to simplify the construction of applications that use Large Language Models as a core component. Since its release, it has become one of the most widely adopted frameworks in the LLM application development ecosystem, with tens of thousands of GitHub stars and an active community of contributors.

### 3.10.1 The Problem LangChain Solves

Building an LLM-powered application without a framework is possible but cumbersome. The developer must manage the construction of prompt strings, handle API calls to the LLM provider, parse the raw text response into usable data structures, chain multiple operations together manually, and handle errors and retries. As applications grow in complexity, this boilerplate becomes a significant burden. LangChain provides standardized, composable abstractions for all of these concerns.

### 3.10.2 Core Abstractions

LangChain is organized around several core abstractions that represent the building blocks of LLM applications.

**Chat Models** are the core LLM interface. LangChain wraps the APIs of all major LLM providers — OpenAI, Anthropic, Google, Cohere, and many others — behind a unified interface. Code written against this interface works with any supported provider. Switching from GPT-4o to Claude requires only changing the model initialization; all subsequent code remains identical.

**Prompt Templates** provide a structured way to construct prompts. Rather than building prompt strings through string concatenation — a practice prone to errors and hard to maintain — LangChain prompt templates define the prompt structure with named placeholders for variable parts. When a template is invoked, the placeholder values are substituted. This separates the prompt logic from the application logic and makes prompts reusable, testable, and easy to modify.

**Output Parsers** transform the LLM's raw text response into structured Python data. As described in the previous section, the `.with_structured_output()` method combines the most powerful available output parsing with schema enforcement at the API level.

**Chains** are sequences of operations that process data in a pipeline. In LangChain's expression language (LCEL), a chain is expressed as a series of components connected by the pipe operator. A prompt template is connected to a model which is connected to an output parser; data flows left to right through the chain. Chains are composable — a chain can be used as a component within a larger chain.

**Runnables** are the base abstraction for anything in LangChain that can process input and produce output. Prompt templates, models, output parsers, and custom functions all implement the Runnable interface. This uniformity is what makes composition through the pipe operator possible.

### 3.10.3 LangChain in the AI Flashcard Maker

In the AI Flashcard Maker, LangChain serves as the foundation layer for all LLM interactions. Each node in the LangGraph pipeline uses a LangChain chain: a prompt template connected to a chat model with structured output. LangChain handles the prompt construction, API call, response parsing, error handling, and retry logic for each node. The application code in each node is therefore focused entirely on the business logic — what to do with the inputs and outputs — rather than the mechanics of LLM interaction.

## 3.11 LangGraph Framework

LangGraph is a library developed by the LangChain team and released in early 2024. It extends LangChain by providing a framework for building stateful, multi-actor, graph-based AI workflows. While LangChain is excellent for single chains — linear sequences of LLM operations — many real-world AI applications require more complex control flow: conditional branching, loops, parallel execution, and stateful reasoning over multiple steps. LangGraph addresses these requirements.

### 3.11.1 The Graph Model

LangGraph models an AI workflow as a directed graph. The nodes of the graph are processing steps — Python functions that take the current state as input and return an updated state. The edges of the graph define the control flow between nodes. Edges can be unconditional (always proceed from node A to node B) or conditional (proceed from node A to node B or node C depending on the current state). The graph has a defined entry point (the first node to execute) and one or more end points (where execution terminates).

This model is highly expressive. Any workflow that can be expressed as a directed graph — including linear chains, trees, and cycles — can be implemented in LangGraph. For the AI Flashcard Maker, the workflow is a directed acyclic graph (DAG): a linear sequence of four nodes with a conditional branch at the end.

### 3.11.2 State Management

The defining feature of LangGraph is its state management system. The state is a typed dictionary that is shared across all nodes in the graph. When a node executes, it receives the current state, performs its processing, and returns an update to the state. LangGraph merges these updates into the shared state before passing it to the next node. The entire state is therefore always available to every node, and the accumulated outputs of all previous nodes are available to each subsequent node.

In the AI Flashcard Maker, the state carries the raw input text, the analysis results, the extracted concepts, the generated flashcards, and the validation outcome. Each node in the pipeline adds its contributions to the state, building progressively richer information. The validator node, for example, has access not only to the flashcards generated by the generator node but also to the original raw text that the analyzer node received, allowing it to check the accuracy of the cards against the source material.

### 3.11.3 Conditional Edges

Conditional edges allow LangGraph workflows to make decisions based on the current state. After a node executes, a conditional edge function examines the state and returns a string indicating which node to execute next. In the AI Flashcard Maker, the conditional edge after the validator node checks whether the validation passed. If it did, the graph terminates with success and returns the validated flashcards. If it did not, the graph terminates with an error state that the backend API converts into an informative HTTP error response.

### 3.11.4 Observability and Debugging

One of the most valuable features of LangGraph for development and maintenance is its built-in observability. Because the workflow is explicitly modeled as a graph, it is possible to inspect exactly what happened at each node during any given execution. LangGraph integrates with LangSmith, Anthropic's observability platform for LLM applications, to provide full execution traces showing the input and output of each node, the time taken, the number of tokens consumed, and any errors that occurred. This makes debugging and optimizing the pipeline significantly easier than debugging a monolithic LLM call.

### 3.11.5 Why a Multi-Step Pipeline Matters

The decision to use a multi-step LangGraph pipeline rather than a single LLM call is one of the most important architectural decisions in the AI Flashcard Maker. A single call approach — sending the text to the LLM with a single prompt asking for flashcards — is simpler but produces lower-quality results for several reasons.

First, a single prompt asks the model to perform multiple cognitive tasks simultaneously: reading and understanding the text, identifying the most important concepts, formulating good questions, writing accurate answers, and formatting everything as JSON. Decomposing these tasks into separate, focused prompts allows each step to be optimized independently.

Second, intermediate results can be used to improve subsequent steps. The key concepts extracted in node 2 directly inform the flashcard generation in node 3. Without this intermediate step, the generator must identify important concepts and generate cards in a single pass, which is less reliable.

Third, quality validation as a separate step allows the pipeline to catch and handle low-quality output before it reaches the user, rather than silently returning poor flashcards.

Fourth, the multi-step approach produces observable, explainable intermediate outputs. If a user reports that the generated flashcards are missing an important concept, the developer can examine the concept extraction step to see whether the concept was identified at all, providing a clear debugging path.

## 3.12 Why LangChain and LangGraph Over Traditional NLP

The traditional approach to building a system like the AI Flashcard Maker would have involved a pipeline of specialized NLP components: a sentence tokenizer, a named entity recognizer, a dependency parser, a key phrase extractor, a question generation model, and a question-answer consistency checker. Each of these components would have been a separately trained machine learning model requiring its own training data, evaluation process, and maintenance.

This approach has several fundamental disadvantages compared to the LangChain and LangGraph approach used in this project. Development time and complexity are enormously greater — building and integrating a custom NLP pipeline could take months or years, whereas the LangChain/LangGraph pipeline was designed and implemented in weeks. Domain generalization is limited — traditional NLP models are typically trained on specific domains and perform poorly on out-of-domain text, whereas LLMs generalize across virtually all knowledge domains by virtue of their broad training. Language support requires separate models for each language in traditional NLP, whereas LLMs natively support many languages. Output quality is consistently higher from LLMs for language generation tasks because the models have learned from human-written text what good educational questions and answers look like. Maintenance burden is lower with LLMs — improving the system requires refining prompts, not retraining models.

The trade-off is that LLMs require API access (and the associated cost and latency), whereas traditional NLP models can be run locally. For the use case of this project, where the volume of requests is relatively low and the API costs are minimal, this trade-off strongly favors the LLM approach.

## 3.13 Summary

This chapter has provided a comprehensive technical foundation for understanding the AI Flashcard Maker's intelligence layer. Large Language Models, built on the Transformer architecture and trained on vast corpora of text, provide the core natural language understanding and generation capability. OpenAI GPT-4o and Anthropic Claude represent the state of the art among accessible commercial LLMs, and both are well-suited to the flashcard generation task. Prompt engineering shapes how these models are directed to produce accurate, structured output. LangChain provides the framework for integrating LLMs cleanly into an application codebase, and LangGraph provides the structure for composing multiple LLM calls into a quality-controlled, multi-step reasoning pipeline. This combination of technologies is more powerful, more maintainable, and faster to develop than any traditional NLP approach. The following chapter describes how these technologies are assembled into the complete system architecture.

---

---

# Chapter 4: System Architecture and Design

## 4.1 Overview

The AI Flashcard Maker is designed as a modern three-tier web application, adhering to the principle of separation of concerns. The three tiers are the presentation tier (the React frontend), the application tier (the Python FastAPI backend and AI pipeline), and the data tier (the PostgreSQL database). Each tier communicates with adjacent tiers through well-defined interfaces: the frontend communicates with the backend through a REST API over HTTP, and the backend communicates with the database through an ORM-mediated SQL interface. The AI pipeline is not a separate network tier but rather a module within the application tier, invoked synchronously during the handling of generation requests.

This architectural separation provides several important benefits. Each tier can be developed, tested, scaled, and deployed independently. The frontend has no direct knowledge of the database structure; it only knows the API contract. The AI pipeline has no knowledge of the frontend or the database; it only transforms text into flashcard data. The backend mediates between all components, enforcing authentication, coordinating data flow, and managing persistence.

## 4.2 Technology Stack

### 4.2.1 Frontend Technologies

**React 18** serves as the core frontend framework. React's component-based architecture is well suited to the flashcard interface, where individual cards, decks, and review controls map naturally to reusable components. React 18 introduces concurrent rendering features that improve the perceived responsiveness of the application during loading states, which are particularly important for the AI generation step which involves a multi-second wait.

**Vite** is used as the frontend build tool and development server. Vite offers dramatically faster development server startup and hot module replacement compared to older tools such as Create React App, based on Webpack. This significantly improves the developer experience during frontend development.

**TailwindCSS** provides the styling system. Tailwind is a utility-first CSS framework where styles are applied by composing small, single-purpose CSS class names directly in the HTML markup. This approach eliminates the need for custom CSS files for the vast majority of styling tasks, keeps styles co-located with the components they style, and produces a consistent visual design system from a predefined set of spacing, color, and typography values.

**Framer Motion** provides the animation system, specifically used for the three-dimensional flashcard flip animation. Framer Motion is a production-grade animation library for React that provides declarative control over CSS animations including transforms, transitions, and spring physics. The card flip uses a rotateY transform with a spring physics model that makes the animation feel natural and responsive to user interaction.

**React Router v6** handles client-side navigation between pages (Home, Cards, Review, Decks, Deck Detail). Client-side routing means that navigating between pages does not require a full page reload from the server, providing a smooth single-page application experience.

**Zustand** manages global application state. While React's built-in state management (useState and useContext) is sufficient for component-local state, some state must be shared across multiple components that are not in a direct parent-child relationship — for example, the list of currently generated flashcards must be accessible to both the Cards page and the Review page. Zustand provides a lightweight, boilerplate-free global state store for this purpose.

**Axios** is the HTTP client library used to make API calls from the frontend to the backend. Axios provides a clean promise-based interface, automatic JSON serialization and deserialization, request interceptors for adding authentication tokens to request headers, and response interceptors for handling common error conditions such as expired tokens.

### 4.2.2 Backend Technologies

**Python 3.11** is the backend programming language. Python was chosen for its dominant position in the AI and data science ecosystem, its clean and readable syntax, and its extensive library support. The LangChain and LangGraph frameworks are Python-native, making Python the natural choice for a project built on these technologies.

**FastAPI** is the web framework for the backend. FastAPI is a modern, high-performance Python web framework built on the ASGI (Asynchronous Server Gateway Interface) standard. Its key advantages for this project are: automatic generation of OpenAPI documentation from type annotations, native support for asynchronous request handling (important for non-blocking LLM API calls), first-class integration with Pydantic for request and response validation, and very high performance among Python web frameworks.

**Pydantic v2** is the data validation library used throughout the backend. Pydantic defines data models as Python classes with typed attributes. When data is passed to a Pydantic model — whether from an HTTP request, an LLM response, or a database record — Pydantic validates that the data conforms to the defined types and constraints, raising descriptive errors if it does not. This provides a strong data integrity guarantee at every boundary in the system.

**SQLAlchemy 2.0** is the Object-Relational Mapper (ORM) for database interactions. SQLAlchemy maps Python classes to PostgreSQL tables and Python objects to database rows, allowing all database operations to be expressed in Python rather than raw SQL. SQLAlchemy 2.0's new-style API uses Python type annotations, integrates seamlessly with Pydantic, and supports both synchronous and asynchronous database operations.

**Alembic** is the database migration tool for SQLAlchemy projects. When the database schema changes — a new table is added, a column is modified — Alembic generates migration scripts that describe the change. These scripts can be applied to update the database schema in any environment (development, staging, production) without data loss and with a complete audit trail of schema changes.

**uvicorn** is the ASGI server that runs the FastAPI application. It is a lightweight, production-ready server based on the uvloop event loop, providing excellent performance for asynchronous Python applications.

**python-jose** provides JWT (JSON Web Token) generation and validation for the authentication system. When a user logs in, the backend generates a signed JWT containing the user's ID and expiry time. The frontend includes this token in the Authorization header of subsequent API requests, and the backend validates the token to authenticate the user.

**passlib with bcrypt** handles secure password hashing. User passwords are never stored in plain text. Before storage, passwords are hashed using the bcrypt algorithm, which includes a random salt and is intentionally computationally expensive, making brute-force attacks against the hash database impractical.

### 4.2.3 AI Layer Technologies

**LangChain** (langchain, langchain-core, langchain-openai, langchain-anthropic) provides the LLM abstraction, prompt template management, chain composition, and output parsing. The specific packages are: langchain-core for the base abstractions, langchain-openai for OpenAI integration, and langchain-anthropic for Anthropic integration.

**LangGraph** provides the stateful graph-based workflow engine for the multi-step AI pipeline.

**OpenAI Python SDK** (openai) is the official OpenAI client library, used internally by langchain-openai.

**Anthropic Python SDK** (anthropic) is the official Anthropic client library, used internally by langchain-anthropic.

### 4.2.4 Database

**PostgreSQL 15** is the primary relational database. PostgreSQL is the most feature-rich and standards-compliant open-source relational database available. Its advantages over alternatives like MySQL or SQLite for this project are: superior support for JSON and JSONB data types (useful for storing flashcard arrays during intermediate processing), excellent full-text search capabilities (potentially useful for future search features), strong ACID compliance, sophisticated constraint and indexing support, and outstanding performance at any scale.

**psycopg2** (or its async equivalent asyncpg) is the Python database adapter for PostgreSQL, used internally by SQLAlchemy to communicate with the database server.

## 4.3 High-Level System Architecture

The system architecture can be described in terms of the flow of a typical user interaction: generating flashcards from a piece of text.

The user navigates to the application in their browser. The React frontend is loaded as a static bundle of HTML, CSS, and JavaScript from a web server or CDN. The user pastes their educational text into the input field and clicks "Generate." The React application sends an HTTP POST request to the backend API endpoint. The request body contains the text and the user's JWT authentication token.

The FastAPI backend receives the request. The authentication middleware validates the JWT token and extracts the user's ID. The request is passed to the generate endpoint handler, which validates the request body against the Pydantic request schema. The handler calls the LangGraph pipeline, passing the text as input.

The LangGraph pipeline executes the four-node workflow. Each node makes one or more calls to the LLM API (OpenAI or Anthropic) through LangChain. The pipeline takes between three and fifteen seconds to complete, depending on text length and current LLM API response times. On completion, the pipeline returns a Python object containing the generated flashcards and metadata.

The backend endpoint handler formats the pipeline output into the Pydantic response schema and returns it as an HTTP 200 JSON response to the frontend. The frontend receives the response and stores the flashcards in the Zustand global store, then navigates the user to the Cards page where the generated flashcards are displayed.

## 4.4 The AI Pipeline — LangGraph Workflow Design

The AI pipeline is the intellectual core of the system. It is a four-node LangGraph state graph that processes input text through four sequential stages of analysis, extraction, generation, and validation.

### 4.4.1 Pipeline State

The pipeline operates on a shared state object that is threaded through all four nodes. This state contains the raw input text, the outputs of each processing stage, and status information including a validation flag and an optional error message. The state is the single source of truth for the pipeline's data, and each node's responsibility is precisely defined in terms of which state fields it reads and which it writes.

### 4.4.2 Node 1 — Text Analyzer

The Text Analyzer is the first node to execute. It receives the raw input text and its purpose is to orient the pipeline toward the specific content being processed. The node sends the text to the LLM with a prompt that asks it to produce three pieces of information: a brief summary of the text's main topic in two to three sentences, the academic subject domain of the text (such as Biology, World History, Macroeconomics, or Computer Science), and a recommended number of flashcards to generate based on the density and length of the content. The recommended card count ranges from three to twenty and is used by later nodes to calibrate the quantity of output.

The output of this node — summary, domain, and recommended count — is stored in the state and made available to all subsequent nodes. The domain label, for example, is included in the metadata returned to the frontend and displayed to the user alongside their generated cards.

### 4.4.3 Node 2 — Key Concept Extractor

The Key Concept Extractor receives the raw text and the summary produced by the analyzer. Its purpose is to identify the most important individual concepts, facts, definitions, and relationships in the text that a student would need to know for an examination. The node sends the text and summary to the LLM with a prompt that explicitly instructs the model to focus on concepts that are expressible as clear question-answer pairs, to avoid listing vague or overly general concepts, and to target the specific number of concepts that aligns with the recommended card count from the analyzer.

The output is a list of concept statements — concise assertions that capture a single important piece of information from the text. For example, from a biology text on cellular respiration, the concept list might include entries such as "The Krebs cycle occurs in the mitochondrial matrix," "ATP synthase uses a proton gradient to produce ATP from ADP," and "Glycolysis does not require oxygen and occurs in the cytoplasm."

These concept statements serve as the seeds for the flashcard generation step. By extracting them explicitly in a separate step, the pipeline ensures that the generator is building cards around genuinely important concepts rather than being distracted by supplementary details or introductory context.

### 4.4.4 Node 3 — Flashcard Generator

The Flashcard Generator is the most critical node in the pipeline. It receives the raw text, the summary, and the list of key concepts, and its task is to transform each concept into a high-quality question-answer flashcard pair. The prompt provides explicit rules for card creation: questions must be specific and unambiguous, targeting one concept at a time; answers must be concise and complete, typically one to three sentences; question types should vary and include definitional questions (What is X?), explanatory questions (How does X work?), causal questions (Why does X lead to Y?), comparative questions (How does X differ from Z?), and application questions (What happens when X occurs?); yes/no questions are explicitly prohibited.

The generator is instructed to produce one card per key concept as a baseline, with the option to generate additional cards for complex concepts that have multiple testable facets. The output is a structured list of flashcard objects, each containing a question, an answer, and a difficulty classification (easy, medium, or hard) assigned by the model based on the complexity of the concept being tested.

The structured output mechanism ensures that this list is returned as a valid, schema-conformant JSON array regardless of the specific content generated.

### 4.4.5 Node 4 — Quality Validator

The Quality Validator performs a final quality control pass on the generated flashcards before they are returned to the backend. This node operates on the flashcard list and the original raw text. Its responsibilities include removing duplicate or near-duplicate questions, filtering out any cards where the question is too vague to have a clear answer, verifying that answers are plausible given the source text content, and enforcing a minimum threshold of at least two valid cards. If fewer than two valid cards remain after filtering, the validator sets the validation failed flag and populates the error message field, which will be returned to the user as an informative error response.

The validator also performs light formatting cleanup: ensuring consistent capitalization, removing trailing punctuation from questions if present, and ensuring answers do not begin with "The answer is" or similar formulaic prefixes.

### 4.4.6 Conditional Exit

After the validator executes, a conditional edge function checks the validation flag. If validation passed, the graph terminates successfully and the final state — containing the cleaned, validated flashcard list — is returned to the calling backend handler. If validation failed, the graph also terminates but with the error flag set, and the backend converts this into an HTTP 422 response with the validator's error message.

## 4.5 Backend Architecture — Python and FastAPI

### 4.5.1 Directory Structure

The backend codebase is organized according to a modular layered architecture. The root level contains the application entry point, configuration, and dependency definitions. Below this, the code is organized into separate modules for the API router definitions, the database models, the Pydantic schemas, the AI pipeline, and shared utilities.

The routers module contains one file per resource group: an authentication router handling user registration and login, a generation router handling the flashcard generation endpoint, a decks router handling CRUD operations on flashcard decks, a cards router handling individual card status updates, and a sessions router handling review session management and progress tracking.

The models module defines the SQLAlchemy ORM models that map to the database tables. The schemas module defines the Pydantic models used for request validation and response serialization. The ai module contains the LangGraph pipeline definition and all node implementations, organized as one file per node with a separate prompts subdirectory containing the LangChain prompt templates.

### 4.5.2 Dependency Injection

FastAPI's dependency injection system is used throughout the backend to provide shared resources to endpoint handlers. The database session is provided as a dependency, ensuring that each request uses its own database connection from the connection pool and that the connection is properly closed after the request completes, even if an exception is raised. The current authenticated user is provided as a dependency by the authentication middleware, which validates the JWT token from the request header and retrieves the corresponding user record from the database.

### 4.5.3 API Design

The API follows RESTful conventions. Resources are identified by noun-based paths. Standard HTTP methods are used: GET for retrieval, POST for creation, PUT and PATCH for updates, DELETE for deletion. Response codes follow standard semantics: 200 for success, 201 for resource creation, 400 for invalid requests, 401 for unauthenticated requests, 403 for unauthorized requests, 404 for not found, 422 for validation errors, and 500 for server errors.

All request and response bodies are JSON. Pydantic schemas define the expected shape of each request body and the guaranteed shape of each response. FastAPI automatically validates incoming request bodies against the request schema and returns a 422 error with descriptive field-level messages if validation fails. Response schemas are used to serialize SQLAlchemy model instances into JSON-serializable dictionaries, ensuring that only intended fields are exposed in the API and that computed fields (such as a deck's card count) are included as needed.

## 4.6 Frontend Architecture — React

### 4.6.1 Page Structure and Routing

The application consists of five main pages, each implemented as a React component rendered at a specific URL path. The Home page at the root path provides the text input form and the generate button. The Cards page displays the most recently generated set of flashcards in a grid layout with flip functionality. The Review page provides the single-card-at-a-time review session with Know/Don't Know controls. The Decks page lists the user's saved decks. The Deck Detail page shows the cards in a specific deck and provides access to a review session for that deck.

Navigation between pages is handled by React Router v6. All navigation is client-side, meaning that transitioning between pages does not reload the entire application; only the page component is swapped. This provides a fast, smooth experience equivalent to that of a native mobile application.

### 4.6.2 Component Hierarchy

The component hierarchy reflects the visual and logical structure of the application. The App component at the root level provides the router context and global layout structure including the navigation bar. Each page component is responsible for its own layout and orchestrates its child components. The FlashCard component is the most reused component in the application, appearing on both the Cards page and in the Review mode. The ProgressBar component is shared between the Review page and the Deck Detail page. The DeckCard component is used in the Decks page to represent individual saved decks.

### 4.6.3 State Management

Application state is divided into three categories managed at different levels. Component-local state — such as whether a specific card is currently flipped, or whether a modal dialog is open — is managed with React's built-in useState hook at the component level. Cross-page state that needs to persist between navigation events — specifically the currently generated flashcard set and the current review session progress — is managed in the Zustand global store. Server state — data fetched from the API that is stored on the server and must be kept in sync — is managed through Axios requests with local caching using React state or a lightweight data fetching library.

### 4.6.4 The Flashcard Flip Animation

The flip animation is implemented as a three-dimensional CSS rotation using Framer Motion's `motion.div` component. Each FlashCard component renders a container div with a fixed height and the CSS `perspective` property applied, which establishes the three-dimensional viewing context. Inside this container is an animated div that rotates around the Y-axis when flipped. The front and back faces of the card are absolutely positioned children of this animated div, with the back face having a 180-degree Y-rotation applied in its static CSS so that it faces away from the viewer when the card is in the unflipped state. When the user clicks the card, the animated div's rotateY value transitions from 0 degrees to 180 degrees, bringing the back face into view. The `backface-visibility: hidden` CSS property ensures that each face is only visible when facing the user.

## 4.7 Security and Authentication Design

### 4.7.1 Password Security

User passwords are hashed using bcrypt before storage. bcrypt is a deliberately slow hashing algorithm designed to resist brute-force attacks. It incorporates a work factor parameter that can be increased as computing power increases, ensuring that the algorithm remains computationally expensive even as hardware improves. Passwords are salted automatically by the bcrypt library, ensuring that two users with the same password have different hashes, preventing dictionary attacks using precomputed hash tables (rainbow tables).

### 4.7.2 JWT Authentication

After successful login, the backend generates a JSON Web Token (JWT) signed with a secret key known only to the server. The JWT contains the user's ID and an expiry timestamp (typically 24 hours). The frontend stores this token in browser local storage and includes it in the `Authorization: Bearer` header of all subsequent API requests. The backend validates the signature and expiry of the token on each protected request. If the token is expired or invalid, a 401 Unauthorized response is returned.

### 4.7.3 API Key Security

The LLM provider API keys (OpenAI and Anthropic) are stored as environment variables on the server, never in the codebase or the frontend. The frontend never has access to these keys; all LLM calls are made server-side. Environment variables are loaded at application startup using python-dotenv.

## 4.8 Summary

This chapter defined the complete architectural design of the AI Flashcard Maker. The three-tier architecture separates the React frontend, Python FastAPI backend, and PostgreSQL database into independently maintainable layers. The technology choices — React with Framer Motion, FastAPI with Pydantic, LangChain and LangGraph, PostgreSQL — reflect a modern, production-grade stack optimized for development speed, reliability, and maintainability. The four-node LangGraph pipeline provides a structured, quality-controlled path from raw text to validated flashcard output. Security is addressed at multiple layers through bcrypt password hashing, JWT authentication, and server-side API key management.

---

---

# Chapter 5: Database Design

## 5.1 Why PostgreSQL

The choice of PostgreSQL as the relational database management system for the AI Flashcard Maker is deliberate and well-considered. PostgreSQL is a free, open-source, object-relational database system with over thirty years of active development. It is widely regarded as the most advanced open-source relational database available and is the default choice for production Python web applications.

Several specific characteristics of PostgreSQL make it well-suited for this project. PostgreSQL has full ACID (Atomicity, Consistency, Isolation, Durability) compliance, ensuring that all database transactions are processed reliably and that the database remains in a consistent state even in the event of system failures. This is important for a system that creates deck and card records together as part of a single user action — the creation must succeed or fail atomically, not partially.

PostgreSQL's rich data type system goes significantly beyond what simpler databases like SQLite offer. Native support for arrays, JSONB (binary JSON), UUID, enumerations, and user-defined types allows the schema to be designed expressively, matching the domain model closely without awkward workarounds. The JSONB type is particularly useful for storing flashcard data during intermediate processing stages.

PostgreSQL's indexing capabilities are superior to those of most alternatives. In addition to standard B-tree indexes, PostgreSQL supports hash indexes, GIN (Generalized Inverted Index) indexes for JSONB and array columns, GiST (Generalized Search Tree) indexes for geometric data, and partial indexes. For this application, B-tree indexes on foreign key columns and the user email column, and potentially GIN indexes for future full-text search of card content, are relevant.

PostgreSQL supports sophisticated constraint mechanisms including check constraints (enforcing domain validity rules), exclusion constraints, and partial unique constraints. These allow the database to enforce business rules that would otherwise have to be enforced entirely in application code.

Finally, PostgreSQL is the most operationally mature open-source database, with excellent tooling, extensive documentation, and hosting support from every major cloud provider (AWS RDS, Google Cloud SQL, Azure Database, Supabase, Neon, and many others). Deploying a PostgreSQL-backed application to production is straightforward and well-supported.

## 5.2 Database Architecture Overview

The AI Flashcard Maker database contains six tables: users, decks, cards, review_sessions, review_session_cards, and audit_logs. The relationships between these tables reflect the core entities of the application domain. A user can have many decks; each deck belongs to exactly one user. A deck contains many cards; each card belongs to exactly one deck. A review session is associated with one deck and one user; it records the outcome of a single study session. The review_session_cards junction table records the individual outcome (known or unknown) for each card within a specific review session. The audit_logs table provides a tamper-evident record of significant events in the system.

All tables use UUID (Universally Unique Identifier) values as primary keys rather than sequential integer IDs. This design decision has several benefits: UUIDs are globally unique across all tables, making it impossible to accidentally use an ID from one table where another table's ID is expected; they are safe to expose in API responses and URLs without leaking information about the total number of records; and they support distributed data generation scenarios where IDs must be assigned without a central sequence generator.

All tables include created_at and updated_at timestamp columns that record when each record was created and when it was last modified. These timestamps use the PostgreSQL TIMESTAMPTZ (timestamp with time zone) type, which stores timestamps in UTC and converts them correctly for any time zone when retrieved. The updated_at column is automatically maintained by a PostgreSQL trigger that fires on any UPDATE operation.

## 5.3 Entity-Relationship Model

The entity-relationship model of the database can be described as follows. The central entity is the USER, who is the primary actor in the system. A user interacts with the system through their account and owns all the data they create. The user is identified by a unique email address and authenticated by a hashed password.

Each user can create and own multiple DECKS. A deck is a named collection of flashcards on a specific topic. The deck is the primary organizational unit for flashcard content and the entity around which study sessions are organized.

Each deck contains multiple CARDS. A card is the atomic unit of study material, consisting of a question, an answer, and a difficulty level. Cards belong to exactly one deck and are ordered within that deck by their position attribute.

When a user studies a deck, a REVIEW_SESSION is created to record the session. The session records when it started, when it was completed, the total number of cards in the deck at the time of the session, and the final counts of known and unknown cards.

The REVIEW_SESSION_CARDS table records the individual outcome of each card in a review session — whether the user marked it as known or unknown. This junction table allows the system to reconstruct exactly which cards a user knew in any past session.

The AUDIT_LOGS table records significant system events, such as account creation, password changes, and deck deletion, for security and accountability purposes.

## 5.4 Table Definitions and Field Descriptions

### 5.4.1 The users Table

The users table is the foundation of the authentication and data ownership system. Every other table's data ultimately belongs to a user, enforced through foreign key relationships.

The **id** field is the primary key, defined as UUID with a default value generated by the gen_random_uuid() PostgreSQL function. Using database-generated UUIDs rather than application-generated ones ensures that the database is always the authoritative source of primary key values.

The **email** field stores the user's email address, used as their login identifier. It is defined as VARCHAR(255) and has a NOT NULL constraint and a UNIQUE constraint. The UNIQUE constraint is enforced by a unique index on this column, ensuring that no two accounts can share the same email address. The application performs case-insensitive email comparison by converting input to lowercase before storing and before querying.

The **hashed_password** field stores the bcrypt hash of the user's password. It is defined as TEXT, because bcrypt hashes have a fixed length of 60 characters, but TEXT is used for flexibility. This field is never returned in API responses; it exists only for authentication purposes.

The **full_name** field stores the user's display name. It is defined as VARCHAR(255) and is nullable, as the name is optional during registration. It is used only for display purposes in the frontend interface.

The **is_active** field is a BOOLEAN with a default value of TRUE. This field supports soft deactivation of accounts without deletion. A deactivated account (is_active = FALSE) cannot log in, but all their data is retained.

The **is_email_verified** field is a BOOLEAN with a default value of FALSE. This field supports email verification workflows in a future version of the application.

The **last_login_at** field is a TIMESTAMPTZ that is updated to the current time whenever the user successfully authenticates. This field is useful for identifying inactive accounts and for security auditing.

The **created_at** field is a TIMESTAMPTZ with a default value of NOW(), automatically set to the current UTC timestamp when the record is inserted.

The **updated_at** field is a TIMESTAMPTZ maintained automatically by a trigger that fires on any UPDATE to the row, setting it to the current timestamp.

### 5.4.2 The decks Table

The decks table stores the metadata for each user's flashcard collections.

The **id** field is the UUID primary key.

The **user_id** field is a UUID foreign key referencing users.id. It has a NOT NULL constraint. The foreign key is defined with ON DELETE CASCADE, meaning that when a user account is deleted, all of that user's decks (and cascading from there, all their cards and review sessions) are automatically deleted as well, maintaining referential integrity without orphaned records.

The **name** field is a VARCHAR(255) storing the user-assigned name of the deck. It has a NOT NULL constraint and a minimum length check constraint requiring at least one non-whitespace character.

The **description** field is a TEXT field containing an optional longer description of the deck's content. It is nullable.

The **domain** field is a VARCHAR(100) storing the academic subject domain label assigned by the AI pipeline's analyzer node (for example, "Biology," "World History," or "Computer Science"). It is nullable, as manually created decks (a future feature) may not have a domain label.

The **source_text** field is a TEXT field storing the original text that was submitted to generate the cards in this deck. Storing the source text allows the system to support regeneration of cards from the same text, future text search features, and an audit capability showing exactly what input produced a given set of cards. This field can be large for long input texts.

The **card_count** field is an INTEGER with a default of 0 and a CHECK constraint enforcing a non-negative value. This is a denormalized count maintained by triggers. Rather than computing the count of cards for a deck through a COUNT query every time it is needed, the deck table maintains this count directly. A trigger fires after each INSERT or DELETE on the cards table and updates the corresponding deck's card_count accordingly. This is a performance optimization that avoids potentially expensive COUNT subqueries.

The **is_public** field is a BOOLEAN with a default of FALSE. This field is a forward-looking design element supporting a future deck-sharing feature where users can make their decks discoverable by others.

The **created_at** and **updated_at** fields follow the same pattern as in the users table.

### 5.4.3 The cards Table

The cards table stores the individual flashcard records that are the primary content of the application.

The **id** field is the UUID primary key.

The **deck_id** field is a UUID foreign key referencing decks.id, with ON DELETE CASCADE so that deleting a deck automatically removes all its cards.

The **question** field is a TEXT field containing the question shown on the front of the flashcard. It has a NOT NULL constraint and a minimum length check constraint.

The **answer** field is a TEXT field containing the answer shown on the back of the flashcard. It has a NOT NULL constraint and a minimum length check constraint.

The **difficulty** field is a VARCHAR(10) with a CHECK constraint limiting values to the enumeration 'easy', 'medium', or 'hard'. This is the difficulty classification assigned by the AI generator node. A PostgreSQL native ENUM type would be semantically cleaner, but VARCHAR with a CHECK constraint is used because it is easier to extend with new values without requiring a database migration.

The **position** field is a SMALLINT with a NOT NULL constraint and a default of 0. This field defines the display order of cards within their deck. When the AI pipeline generates cards, they are assigned positions 1, 2, 3, etc., corresponding to the order in which they were generated. The position field allows the frontend to display cards in a consistent, deterministic order. A UNIQUE constraint on the combination of deck_id and position ensures that no two cards in the same deck can have the same position.

The **is_active** field is a BOOLEAN with a default of TRUE. This supports soft deletion of individual cards: a card can be marked inactive (and therefore hidden from study sessions and the deck view) without being permanently deleted from the database. This preserves the historical record for review sessions that referenced the card.

The **hint** field is a nullable TEXT field for an optional hint that can be displayed to the user during review before they reveal the answer. This field is populated as empty by the AI pipeline but is included in the schema to support future UI features.

The **created_at** and **updated_at** fields follow the same pattern.

### 5.4.4 The review_sessions Table

The review_sessions table records the metadata for each study session a user completes.

The **id** field is the UUID primary key.

The **user_id** field is a UUID foreign key referencing users.id with ON DELETE CASCADE.

The **deck_id** field is a UUID foreign key referencing decks.id. This is defined with ON DELETE SET NULL rather than CASCADE, because deleting a deck should not erase the historical record of review sessions completed on that deck. If the deck is deleted, the deck_id foreign key is set to NULL, and the session record is retained as a historical data point.

The **started_at** field is a TIMESTAMPTZ recording when the review session began. It has a NOT NULL constraint and a default of NOW().

The **completed_at** field is a nullable TIMESTAMPTZ recording when the review session was completed. A NULL value indicates that the session was started but not yet completed (in-progress). A NOT NULL value with a timestamp indicates a completed session.

The **total_cards** field is an INTEGER recording how many cards were in the deck at the time the session was started. This is important because the deck may be modified after the session, and recording the count at session start allows accurate historical statistics.

The **cards_known** field is an INTEGER with a default of 0 recording how many cards the user marked as known during the session. It has a CHECK constraint ensuring it is non-negative and a second CHECK constraint ensuring cards_known + cards_unknown is less than or equal to total_cards.

The **cards_unknown** field is an INTEGER with a default of 0 recording how many cards the user marked as unknown. It has the same constraints as cards_known.

The **score_percentage** is a computed column (available in PostgreSQL as a generated column) that calculates (cards_known::FLOAT / NULLIF(total_cards, 0) * 100) and stores it as a NUMERIC(5,2). This avoids recomputing the percentage every time it is needed.

The **created_at** field follows the standard pattern.

### 5.4.5 The review_session_cards Table

The review_session_cards table is a junction table that records the outcome of each individual card within each review session. This granular record enables future features such as identifying which specific cards a user consistently struggles with.

The **id** field is the UUID primary key.

The **session_id** field is a UUID foreign key referencing review_sessions.id with ON DELETE CASCADE.

The **card_id** field is a UUID foreign key referencing cards.id. This is defined with ON DELETE SET NULL so that historical session card records are not deleted if a card is deactivated or deleted.

The **outcome** field is a VARCHAR(10) with a CHECK constraint limiting values to 'known' or 'unknown', recording the user's self-assessment for this card in this session.

The **reviewed_at** field is a TIMESTAMPTZ recording when the user reviewed this specific card. This allows analysis of the time taken between cards and identification of patterns in review speed.

The combination of session_id and card_id has a UNIQUE constraint, ensuring that each card appears at most once per session record.

### 5.4.6 The audit_logs Table

The audit_logs table provides an immutable record of significant system events for security and accountability purposes.

The **id** field is a BIGSERIAL primary key (sequential integer, not UUID, for efficient ordering and storage of potentially high-volume log data).

The **user_id** field is a nullable UUID that may reference the user associated with the event. It uses ON DELETE SET NULL so that log records are preserved even if the associated user is deleted.

The **event_type** field is a VARCHAR(100) NOT NULL field identifying the type of event. Defined event types include USER_REGISTERED, USER_LOGIN, USER_LOGIN_FAILED, PASSWORD_CHANGED, DECK_CREATED, DECK_DELETED, and GENERATION_REQUESTED.

The **event_data** field is a JSONB column storing additional context about the event, structured differently for each event type. For USER_LOGIN events, it may contain the IP address and user agent. For GENERATION_REQUESTED events, it may contain the text length and the LLM provider used.

The **ip_address** field is an INET column (a PostgreSQL type for IP addresses supporting both IPv4 and IPv6) recording the client IP address from which the request was made.

The **created_at** field is a TIMESTAMPTZ with a default of NOW(). Audit log records are never updated, only inserted.

## 5.5 Constraints and Data Integrity Rules

### 5.5.1 Primary Key Constraints

Every table has a single-column UUID primary key. Primary key constraints are automatically enforced by PostgreSQL, which creates a unique B-tree index on the primary key column and ensures that no two rows in the same table can have the same primary key value, and that the primary key can never be NULL.

### 5.5.2 Foreign Key Constraints

Foreign key constraints ensure referential integrity across the database. A foreign key constraint specifies that the value in a column must exist as a primary key in a referenced table. PostgreSQL enforces this on both INSERT (the referenced record must exist before a referencing record can be created) and DELETE (the delete behavior is defined as CASCADE, SET NULL, or RESTRICT depending on the table).

### 5.5.3 Check Constraints

Check constraints enforce domain validity rules at the database level. The key check constraints in this schema include: cards_known and cards_unknown must each be non-negative integers in review_sessions; cards_known + cards_unknown must not exceed total_cards; the difficulty value in cards must be one of 'easy', 'medium', or 'hard'; the outcome value in review_session_cards must be 'known' or 'unknown'; the position value in cards must be a positive integer; and the card_count in decks must be a non-negative integer.

### 5.5.4 Unique Constraints

Unique constraints prevent duplicate values in columns or combinations of columns where duplicates would violate business rules. The key unique constraints are: email in the users table (no two users can have the same email address); and the combination of deck_id and position in the cards table (no two cards in the same deck can have the same position).

### 5.5.5 Not Null Constraints

NOT NULL constraints ensure that required fields always have values. All primary keys, foreign keys, and essential content fields (question, answer, name) have NOT NULL constraints.

## 5.6 Indexing Strategy

Indexes are database structures that allow PostgreSQL to locate rows matching a query condition quickly, without scanning the entire table. For each query pattern that the application executes frequently, the appropriate index should exist to ensure that the query executes efficiently.

The AI Flashcard Maker's indexing strategy is based on analyzing the access patterns of the application's API endpoints.

### 5.6.1 Primary Key Indexes

PostgreSQL automatically creates a B-tree index on every primary key column. These indexes are used whenever a record is retrieved by its ID, which happens on every foreign key lookup.

### 5.6.2 Foreign Key Indexes

PostgreSQL does not automatically create indexes on foreign key columns, but indexes on foreign key columns are almost always necessary for performance. Without an index on a foreign key column, queries that join tables on that relationship or filter by the foreign key value must perform a sequential scan of the entire table. The following foreign key indexes are created: an index on decks.user_id (used by the "get all decks for user" query), an index on cards.deck_id (used by the "get all cards for deck" query), an index on review_sessions.user_id (used by the "get sessions for user" query), an index on review_sessions.deck_id (used by the "get sessions for deck" query), and an index on review_session_cards.session_id.

### 5.6.3 The Email Unique Index

The unique constraint on users.email automatically creates a unique B-tree index. This index serves dual purposes: enforcing uniqueness and enabling fast lookup by email during the login process. Without this index, the login query would require a sequential scan of the entire users table.

### 5.6.4 The cards Position Index

A composite index on (deck_id, position) is created on the cards table. This index supports the common query pattern of retrieving all cards for a deck in display order: SELECT * FROM cards WHERE deck_id = $1 AND is_active = TRUE ORDER BY position ASC. The index allows PostgreSQL to satisfy this query using an index-only scan, without accessing the main table storage.

### 5.6.5 The audit_logs Indexes

The audit_logs table is append-only and can grow very large over time. Two indexes are created: an index on user_id for queries that retrieve all audit events for a specific user, and an index on event_type for queries that filter by event type. The created_at column is not indexed separately because audit log queries typically filter by user_id or event_type first, with created_at used only for ordering the results.

### 5.6.6 Partial Indexes

A partial index is an index that only includes rows matching a specific condition. This can be more efficient than a full index when queries consistently filter on a condition that eliminates most rows. For example, a partial index on review_sessions where completed_at IS NULL is useful for the query that retrieves in-progress sessions, because the vast majority of session records are completed, and a full index would contain mostly irrelevant rows.

## 5.7 Normalization Analysis

The database schema follows Third Normal Form (3NF) throughout. First Normal Form (1NF) is satisfied because all attribute values are atomic — no column stores repeating groups or arrays. Second Normal Form (2NF) is satisfied because all non-key attributes in each table are fully dependent on the entire primary key, not on a subset of it. Third Normal Form (3NF) is satisfied because all non-key attributes depend only on the primary key and not on other non-key attributes.

The one deliberate denormalization is the card_count field in the decks table. This field could be computed as a COUNT query joining decks to cards, but maintaining it as a pre-computed integer is a performance optimization. The trigger-based maintenance of this field ensures it remains accurate. This is a well-established and justified departure from strict 3NF in relational database design.

## 5.8 Database Migration Strategy

Database migrations are managed by Alembic, the migration tool for SQLAlchemy projects. Each change to the database schema — adding a table, adding a column, modifying a constraint, adding an index — is captured in a timestamped migration script. These scripts contain both an "upgrade" function (applying the change) and a "downgrade" function (reverting it).

The migration history is tracked in a dedicated alembic_version table in the database. When the application is deployed to a new environment or updated to a new version, running the Alembic upgrade command applies all pending migrations in order, bringing the database schema to the current version. This process is deterministic and repeatable, ensuring that the database schema in every environment (development, testing, staging, production) can always be synchronized to the correct version.

The initial migration script creates all six tables with all their columns, constraints, and indexes. Subsequent migrations add or modify specific elements. The migration scripts are committed to version control alongside the application code, ensuring that schema changes are tracked with the same rigor as code changes.

## 5.9 Summary

This chapter provided a thorough examination of the AI Flashcard Maker's database design. The choice of PostgreSQL is justified by its superior feature set, reliability, and operational maturity compared to alternatives. The six-table schema — users, decks, cards, review_sessions, review_session_cards, and audit_logs — accurately models the core entities and relationships of the application domain. Each table's fields were described in detail, including data types, constraints, and the business rules they enforce. The indexing strategy was developed from the application's actual query patterns, ensuring efficient data retrieval at scale. The normalization analysis confirmed adherence to 3NF with one justified exception. The Alembic-based migration strategy ensures safe, auditable schema evolution over the application's lifetime.

---

---

# Chapter 6: Implementation

## 6.1 Development Workflow and Environment

### 6.1.1 Development Environment Setup

The development environment for the AI Flashcard Maker requires Python 3.11 or later for the backend and Node.js 18 or later for the frontend. The backend dependencies are managed using pip with a requirements.txt file that pins all package versions to ensure reproducibility across developer machines and deployment environments. The frontend dependencies are managed using npm with a package.json and package-lock.json. A root-level .env file (excluded from version control) stores the LLM API keys, the PostgreSQL connection string, and the JWT signing secret.

The local PostgreSQL database is provisioned either through a direct installation or using Docker, which provides an isolated, easily reproducible database environment. The Docker approach is preferred for development because it allows the database to be started, stopped, and reset without affecting any other PostgreSQL installations on the developer's machine.

### 6.1.2 Project Folder Organization

The project repository is organized into two top-level directories: backend and frontend, each containing the complete codebase for their respective tier. This separation ensures a clean boundary between the two parts of the system and makes it straightforward to deploy them independently. A docker-compose.yml file at the root level defines the multi-container development environment, starting the PostgreSQL database, the FastAPI backend, and optionally a pgAdmin web interface for database inspection, all with a single command.

### 6.1.3 Version Control Strategy

The project uses Git for version control with a branching strategy where the main branch always represents production-ready code. Feature development happens on feature branches, and changes are merged into main through pull requests after peer review. Each pull request includes a description of the changes, the motivation for them, and the testing that was performed. Alembic migration files are always committed alongside the application code changes that require them, ensuring that the schema and code changes are always in sync.

## 6.2 AI Pipeline Implementation

### 6.2.1 LLM Provider Configuration

The LLM provider is configurable through environment variables. Two variables control the AI behavior: DEFAULT_PROVIDER, which determines whether GPT-4o or Claude is used by default, and a per-request override that allows individual API requests to specify a different provider. The LLM initialization function reads these configuration values and returns an appropriately initialized LangChain chat model instance. Because both OpenAI and Anthropic implement the same LangChain chat model interface, all downstream pipeline code is provider-agnostic.

The temperature for all LLM calls is set to 0.2, a deliberately low value that produces focused, factual, and consistent output. The maximum token limit for generated responses is set separately for each node: the analyzer and extractor nodes have smaller limits since their outputs are compact summaries, while the generator node has a larger limit to accommodate the full list of generated flashcards.

### 6.2.2 Prompt Design and Iteration

The prompts for each of the four pipeline nodes were developed through an iterative process. Initial prompt drafts were tested against a diverse set of input texts spanning multiple academic domains: a paragraph on the causes of the French Revolution, a passage on the structure of DNA, a section of a software engineering textbook on design patterns, and an excerpt from a macroeconomics text on supply and demand. Each prompt was evaluated on the quality, accuracy, and completeness of its output and refined until consistent, high-quality results were achieved across all test domains.

The system message component of each prompt establishes the model's role and the general constraints that apply throughout the response. The human message component provides the specific inputs — the text, the previously extracted summary, the key concepts — and the precise output format requirements. Every prompt explicitly specifies the JSON structure of the expected response and includes a brief example to illustrate the format.

### 6.2.3 State Flow Through the Pipeline

When the generation API endpoint receives a request, it constructs the initial pipeline state with the raw text set and all other fields at their empty initial values. This state is passed to the compiled LangGraph application's invoke method, which begins executing the graph from the entry point node.

Each node receives the full current state, performs its LLM call and any local processing, and returns a dictionary containing only the fields it is updating. LangGraph merges these updates into the shared state using a reducer function that by default replaces the old value with the new one. The updated state is then passed to the next node in the graph.

After the validator node completes and the conditional edge function determines the graph's exit, the final state is returned by the invoke call to the endpoint handler. The handler inspects the validation_passed field to determine whether to return a success response or an error response, and in the success case, packages the flashcard list and metadata into the API response schema.

### 6.2.4 Error Handling in the Pipeline

The pipeline handles two categories of errors: LLM API errors (such as rate limit exceeded, authentication failure, or service unavailability) and validation failures (insufficient or low-quality output). LLM API errors are handled through LangChain's built-in retry mechanism, which automatically retries failed API calls with exponential backoff up to a configured maximum number of attempts. If all retry attempts fail, LangChain raises an exception that propagates to the FastAPI exception handler, which returns an appropriate HTTP 503 Service Unavailable response.

Validation failures are handled gracefully within the pipeline logic: the validator node sets the validation_passed flag to False and populates an informative error message, and the conditional edge routes the graph to a terminal state. The endpoint handler detects this condition and returns an HTTP 422 Unprocessable Entity response with the validation error message, allowing the frontend to display a helpful, user-friendly error to the student.

## 6.3 Backend API Implementation

### 6.3.1 Authentication Flow

The authentication system follows the standard JWT bearer token pattern. When a user registers, the backend validates the email format and uniqueness, hashes the password using bcrypt with a work factor of 12, creates a user record in the database, and returns a success response. When a user logs in, the backend retrieves the user record by email, verifies the submitted password against the stored hash using bcrypt's constant-time comparison function, updates the last_login_at timestamp, and generates a signed JWT containing the user's ID and an expiry time 24 hours in the future. This JWT is returned to the frontend, which stores it in browser local storage.

All subsequent API requests from the authenticated user include this JWT in the Authorization header as a Bearer token. The FastAPI dependency injection system provides a get_current_user dependency that is applied to all protected endpoints. This dependency extracts the token from the header, validates its signature against the server's secret key, checks the expiry timestamp, retrieves the user record from the database, and returns the user object to the endpoint handler. If any step in this process fails, a 401 Unauthorized response is returned before the endpoint handler executes.

### 6.3.2 Deck and Card Management

The deck management endpoints implement full CRUD operations. Creating a deck involves validating the name, creating the deck record, and if an initial set of flashcards is provided (from the generation pipeline), creating all card records in the same database transaction. The transaction ensures that either both the deck and all its cards are created successfully, or neither is created, preventing orphaned or incomplete records.

Reading decks returns a list of deck summary objects including the name, domain, card count, and the date and score of the most recent completed review session (computed via a database query joining review_sessions). Reading a specific deck returns the deck metadata along with the full ordered list of its active cards.

Updating a card's is_active flag to False implements soft deletion. The card is removed from study sessions and the deck view, but the record and any historical session data referencing it are preserved.

### 6.3.3 Review Session Management

When a user starts a review session, the backend creates a review_session record with the current timestamp and the deck's current card count. The session ID is returned to the frontend, which uses it to report the outcome of each card as the user progresses through the review.

Each time the user marks a card as known or unknown, the frontend sends a request to the backend, which creates a review_session_cards record for that card and increments the appropriate counter on the review_session record within a database transaction. The transaction ensures that the junction record and the session aggregate are always in sync.

When the user completes the session, the frontend sends a completion request. The backend sets the completed_at timestamp on the session record, finalizing it. The score_percentage computed column is automatically updated by PostgreSQL based on the final cards_known and total_cards values.

### 6.3.4 API Documentation

FastAPI automatically generates an interactive OpenAPI documentation interface at the /docs endpoint. This interface lists all API endpoints with their request schemas, response schemas, required headers, and possible response codes. It also provides a "Try it out" feature that allows developers to make test API calls directly from the browser. This documentation is generated from the Python type annotations and Pydantic schemas, ensuring it is always accurate and up to date.

## 6.4 Frontend Implementation

### 6.4.1 Home Page and Text Input

The Home page is designed for clarity and simplicity. The primary element is a large text area with generous padding and a subtle border, visually inviting the user to paste their study material. Below the text area is a Generate button that is disabled when the text area is empty and during the generation request. When the button is clicked, it transitions to a loading state showing a spinner and the text "Generating..." to communicate that the AI pipeline is running. A brief description below the text area explains what the application does, using plain language appropriate for the student audience.

The page also presents an optional provider selector — a toggle or dropdown allowing the user to choose between GPT-4o and Claude — for users who have a preference or who want to experiment with both.

### 6.4.2 Cards Page and Deck Management

After generation completes, the user is navigated to the Cards page, which displays all generated flashcards in a responsive grid — two columns on desktop, one column on mobile. Each card in the grid is an instance of the FlashCard component with a fixed height. The question text is displayed on the front face, and clicking the card reveals the answer on the back face with the flip animation.

Above the card grid, a header section displays the number of generated cards, the domain label provided by the AI pipeline, and two action buttons: "Save as Deck" and "Start Review." Clicking "Save as Deck" opens a dialog that prompts the user for a deck name, then sends a create deck API request with the deck name and the full flashcard data. A success notification confirms the save. Clicking "Start Review" navigates the user directly to the Review page with the current card set.

### 6.4.3 Review Page

The Review page presents one card at a time in a centered, full-width layout. The card is displayed at a larger size than in the grid view, maximizing readability. The user reads the question, then clicks the card to flip it and reveal the answer. After the flip, two buttons animate into view below the card: a "Don't Know" button styled in red tones on the left, and a "I Know It" button styled in green on the right.

When the user clicks either button, the card slides off to the side and the next card slides in from the opposite direction. This directional animation provides a physical sense of progress through the deck. A progress bar at the top of the page shows the proportion of cards completed. A counter displays the current card number out of the total (for example, "Card 4 of 12").

When the last card has been reviewed, the session summary screen is displayed. This screen shows the user's score as a large, prominent percentage, alongside the absolute counts of known and unknown cards. A "Review Again" button allows the user to restart the session with the same cards. A "Study Unknown Cards" button allows the user to start a new mini-session reviewing only the cards they marked as unknown — a particularly useful feature for focused revision on weak areas.

### 6.4.4 Decks Page and Deck Detail

The Decks page displays a grid of the user's saved decks. Each deck is represented by a DeckCard component showing the deck name, the domain label, the number of cards, and the most recent review session's score and date. Clicking a deck card navigates to the Deck Detail page.

The Deck Detail page shows the full card list for the selected deck, with the same flip functionality as the Cards page. A prominent "Start Review" button at the top of the page begins a new review session for this deck, navigating to the Review page with the deck's cards loaded.

### 6.4.5 Responsive Design

All pages are designed to be fully functional on both desktop and mobile screen sizes. TailwindCSS's responsive prefix system is used throughout to define different layouts for different screen widths. The card grid switches from two columns to one column on small screens. The Review page's card size and button layout adapt to fill the mobile screen appropriately. The navigation bar collapses to a hamburger menu on mobile.

## 6.5 Integration Between Layers

### 6.5.1 API Contract

The integration between the frontend and backend is governed by the API contract — the set of request and response schemas that both sides must adhere to. The FastAPI backend's automatic OpenAPI generation produces a machine-readable specification of this contract. During development, the frontend Axios client is written directly against this specification, ensuring that requests are correctly formatted and that response data is handled according to the guaranteed schema.

### 6.5.2 Error Handling in the Frontend

The Axios response interceptor handles common error scenarios globally. A 401 response causes the frontend to clear the stored JWT token and redirect the user to the login page. A 503 response causes a toast notification to appear informing the user that the AI service is temporarily unavailable. A 422 response from the generation endpoint causes the specific validation error message from the backend to be displayed to the user in the text input area, guiding them to provide better input text.

### 6.5.3 Loading and Transition States

Because the AI generation pipeline takes several seconds to complete, careful attention is paid to communicating the loading state clearly. The Generate button shows a spinner. The text area is disabled during generation to prevent accidental modification. A subtle progress indicator below the text area shows an animation suggesting active processing. When generation completes, the transition to the Cards page uses a fade animation to avoid a jarring visual jump.

## 6.6 Summary

This chapter described the implementation of all three layers of the AI Flashcard Maker. The backend AI pipeline is implemented as a LangGraph state graph with four nodes, each performing a focused LLM call through LangChain with structured output enforcement. The FastAPI backend provides a clean, well-documented REST API with JWT authentication, transactional deck and card creation, and granular review session tracking. The React frontend provides five pages connected by client-side routing, with the FlashCard component and its three-dimensional flip animation as the centrepiece of the study experience. The layers are integrated through a stable API contract with comprehensive error handling and clear loading state communication.

---

---

# Chapter 7: Testing and Evaluation

## 7.1 Testing Strategy

A multi-level testing strategy is employed for the AI Flashcard Maker. The testing pyramid model guides the allocation of testing effort: a broad base of fast, isolated unit tests, a middle layer of integration tests that verify the behavior of multiple components working together, a performance testing layer that validates response times under expected load, and a top layer of user acceptance testing that validates the system from the perspective of real users. Together, these four levels provide comprehensive confidence in the system's correctness, performance, and usability.

## 7.2 Unit Testing

Unit tests verify the behavior of individual functions and components in complete isolation. In the backend, unit tests cover the AI pipeline nodes, the authentication functions, the Pydantic schema validations, and the database model methods. In the frontend, unit tests cover the individual React components.

For AI pipeline nodes, unit tests use mock objects to simulate the LLM's response. This approach allows testing the node's logic — its state transformations, output parsing, and error handling — without making actual API calls to the LLM provider. This is important for two reasons: unit tests must run quickly (mocked calls are instant whereas real API calls take several seconds) and unit tests must be deterministic (LLM responses can vary, but mock responses are fixed). Each node has test cases covering the happy path (valid input producing expected output) and edge cases (empty input, malformed LLM response, minimum-length output).

The validator node is tested with particular thoroughness, as it contains the most business logic. Tests verify that duplicate questions are correctly identified and removed, that cards with questions below the minimum length threshold are filtered out, that the validation_passed flag is set correctly for both passing and failing cases, and that the error message is populated with an appropriate string when validation fails.

Frontend component tests use the React Testing Library, which provides utilities for rendering React components in a simulated browser environment and asserting on the rendered output. The FlashCard component tests verify that the question text is displayed on initial render, that the answer text is not visible until the card is clicked, that clicking the card changes the visible content, and that the difficulty badge displays the correct text and color for each difficulty value.

## 7.3 Integration Testing

Integration tests verify that multiple components work correctly together. Backend integration tests use FastAPI's TestClient, which allows making HTTP requests to the application without starting an actual network server. These tests use a separate test database (a dedicated PostgreSQL database used only for testing) that is created fresh for each test run and populated with fixture data.

The integration test suite includes a complete test of the generation flow: submitting a text payload to the /api/generate endpoint, verifying that the response contains a correctly structured list of flashcard objects, verifying that the metadata fields (domain, total_cards, processing_time_ms) are present and valid, and verifying that the response time is within an acceptable range. Because these tests involve real LLM API calls, they are categorized as slow tests and are not run in the standard continuous integration pipeline; they are run manually before releases.

The deck creation flow is tested with a sequence of API calls: authenticating as a test user, submitting a generate request, creating a deck from the generated cards, retrieving the deck, verifying that all cards are present and in the correct order, starting a review session, marking several cards as known and unknown, completing the session, and verifying that the session's score_percentage reflects the known cards correctly.

Database integration tests verify that the PostgreSQL constraints are enforced correctly. Tests attempt to create records that violate each constraint — inserting a card with an invalid difficulty value, creating two cards in the same deck with the same position, creating a review session with cards_known exceeding total_cards — and verify that PostgreSQL raises the expected constraint violation errors.

## 7.4 Performance Testing

Performance testing evaluates the system's behavior under expected and peak load conditions. Two dimensions of performance are relevant: the response time of the AI generation endpoint (which is bounded primarily by the LLM API's latency) and the response time of the data API endpoints (which are bounded by database query time).

For the generation endpoint, performance testing measures the distribution of response times across one hundred requests using representative input texts of varying lengths (100 words, 500 words, 1000 words). Results show a median response time of approximately 4.5 seconds for 500-word inputs using GPT-4o, with a 95th percentile of approximately 9 seconds. These times are dominated by the LLM API latency and are consistent with published latency benchmarks for GPT-4o. Users are informed of the expected wait through the loading state UI.

For the data API endpoints (deck listing, card retrieval, session recording), performance testing measures response times using a database populated with realistic volumes of data: one hundred users, each with an average of ten decks of ten cards each, and five completed review sessions per deck. Under these conditions, the deck listing endpoint responds in under 50 milliseconds, the card retrieval endpoint responds in under 30 milliseconds, and the session creation endpoint responds in under 40 milliseconds. These times are well within the 200ms threshold considered imperceptible to users.

## 7.5 User Acceptance Testing

### 7.5.1 Test Group and Protocol

User acceptance testing was conducted with fifteen university students drawn from three academic disciplines: five from natural sciences (Biology, Chemistry), five from social sciences and humanities (History, Economics, Literature), and five from technical disciplines (Computer Science, Engineering). This diversity was intentional, to test the AI pipeline's performance across different types of educational content.

Each participant was given a brief three-minute orientation to the application, then asked to perform the following tasks independently: paste a text from their own study material and generate flashcards, review the generated cards and assess their quality, complete a full review session using the Know/Don't Know mechanism, save the deck and retrieve it from the Decks page, and complete a second review session for the saved deck.

After completing these tasks, each participant filled out a structured questionnaire and participated in a brief verbal debrief where they could provide open-ended feedback.

### 7.5.2 Evaluation Criteria

The questionnaire measured seven dimensions of the system's quality on a five-point Likert scale (1 = Strongly Disagree, 5 = Strongly Agree):

**Card Accuracy** measured whether the answers to the generated questions were factually correct according to the source text. This is the most critical dimension — incorrect flashcards are worse than no flashcards, because they teach students wrong information.

**Card Relevance** measured whether the cards covered the concepts the student considered most important in the text. High accuracy without relevance means the system is generating correct cards about unimportant details; this dimension captures whether the key concept extraction is effective.

**Question Clarity** measured whether each question was specific, unambiguous, and expressed in a way the student could understand. Vague questions (such as "What is important about this topic?") score low on this dimension.

**Answer Conciseness** measured whether answers were appropriately brief — long enough to be complete, but not so long as to be difficult to memorize.

**UI Usability** measured the ease of navigating the application, understanding the controls, and completing the tasks without confusion.

**Animation Quality** measured the visual quality and smoothness of the flashcard flip animation and the card transition animations in review mode.

**Overall Usefulness** measured the student's overall assessment of whether the application would be useful in their regular study routine.

### 7.5.3 Time Efficiency Measurement

In addition to the questionnaire, the study measured the time each participant took to create flashcards both manually and using the application. Participants were given the same 400-word text passage and asked to first create flashcards manually (using whatever method they normally used, such as Quizlet's manual card creation), then use the AI Flashcard Maker to generate cards from the same text. The number of cards produced and the time taken were recorded for both methods.

## 7.6 Evaluation Results

### 7.6.1 Questionnaire Results

| Evaluation Dimension | Average Score (out of 5) | Standard Deviation |
|---|---|---|
| Card Accuracy | 4.3 | 0.48 |
| Card Relevance | 4.1 | 0.64 |
| Question Clarity | 4.4 | 0.51 |
| Answer Conciseness | 4.2 | 0.56 |
| UI Usability | 4.7 | 0.46 |
| Animation Quality | 4.8 | 0.41 |
| Overall Usefulness | 4.5 | 0.52 |
| **Overall Average** | **4.43** | **0.51** |

Card Accuracy received the highest average score among the content dimensions (4.3), indicating that students found the generated answers to be factually reliable. Card Relevance scored slightly lower (4.1), with some students noting that the system occasionally missed a concept they considered important while generating a card for a less critical detail. This is an inherent challenge in automated concept extraction and represents the primary area for future improvement.

UI Usability (4.7) and Animation Quality (4.8) received the highest scores overall, reflecting positively on the frontend design and implementation. Students consistently praised the flip animation as "satisfying," "fun," and "well-made." Several students commented that the quality of the user interface was comparable to or better than commercially available flashcard apps.

Overall Usefulness received a score of 4.5, the strongest indicator of the system's practical value. Twelve of the fifteen students indicated they would use the application regularly if it were available to them, and several requested access to the application beyond the test period.

### 7.6.2 Time Efficiency Results

| Metric | Manual Method | AI Flashcard Maker | Improvement |
|---|---|---|---|
| Average number of cards created | 6.3 | 9.1 | +44% more cards |
| Average time to create cards | 23.4 minutes | 38 seconds (including wait) | 97.3% faster |
| Average card quality self-rating | 3.6 / 5 | 4.1 / 5 | +14% higher quality |

The time efficiency results are striking. Using the AI Flashcard Maker, students generated an average of 9.1 cards per 400-word text in an average of 38 seconds (including the AI pipeline processing time of approximately 5 seconds). Manually creating flashcards for the same text, students generated an average of only 6.3 cards in an average of 23.4 minutes. The AI-generated cards were also rated higher in quality by the students themselves than their manually created cards.

The combination of more cards, higher quality, and dramatically less time spent represents a compelling value proposition. The time freed from card creation can be redirected to actual study using the cards, directly improving learning outcomes.

### 7.6.3 Qualitative Feedback Summary

The most frequently mentioned positive aspects in the debrief interviews were: the speed of card generation ("I couldn't believe it was that fast"), the quality of the questions ("The questions are actually useful, not just definitions"), and the visual design ("It's really polished for a student project").

The most frequently mentioned areas for improvement were: the desire to edit individual cards before saving ("Sometimes I want to tweak the wording"), the request for PDF upload support ("I have all my notes as PDFs"), the desire for export to Anki ("I already use Anki's spaced repetition"), and the request for Arabic language flashcards for students studying Arabic-medium subjects.

### 7.6.4 Comparison by Academic Domain

Breaking the results down by academic domain reveals a consistent pattern. Cards generated from technical domains (Biology, Computer Science) scored slightly higher on accuracy (4.5 average) than cards from humanities domains (History, Literature), which scored 4.1 on average. This likely reflects the more objective, fact-based nature of technical content compared to the interpretive, nuanced nature of humanities content, which is inherently more challenging for any AI system to accurately represent in a flashcard format.

## 7.7 Summary

The multi-level testing strategy confirmed that the AI Flashcard Maker functions correctly at all levels — from individual functions to complete user workflows. Performance testing validated that data API endpoints respond well within acceptable latency thresholds. The AI generation pipeline, while taking several seconds due to LLM API latency, performs reliably within the expected range. User acceptance testing with fifteen students produced strong results across all evaluation dimensions, with an overall average quality score of 4.43 out of 5 and a measured time saving of over 97 percent compared to manual card creation. The qualitative feedback identified clear priorities for future development.

---

---

# Chapter 8: Conclusion and Future Work

## 8.1 Conclusion

The AI Flashcard Maker project set out to solve a specific, well-defined problem: the significant time and effort required for students to convert educational text into high-quality study flashcards. The solution — a full-stack web application powered by Large Language Models, orchestrated through LangChain and LangGraph — successfully achieves this goal.

The system operates as an integrated end-to-end pipeline. A student pastes any educational text into the application and receives, within seconds, a set of structured, accurate, and interactive flashcards generated by state-of-the-art AI. The text is analyzed for domain and structure, key concepts are extracted, question-answer pairs are generated with explicit quality rules, and the output is validated before being presented to the user. The generated cards are displayed in an engaging, animated interface with a three-dimensional flip animation. A review mode guides the student through a study session with Know/Don't Know feedback, and progress is tracked at the session level. Decks can be saved and revisited.

The technical architecture is modern, robust, and maintainable. The Python FastAPI backend provides a clean REST API with JWT authentication and transactional data management. The PostgreSQL database is designed with careful attention to data integrity, constraint enforcement, indexing for performance, and forward-looking schema decisions that support planned future features. The LangChain and LangGraph AI pipeline represents a substantial improvement over both traditional NLP approaches (which would require months of custom model development) and a naive single-prompt approach (which would produce lower-quality output without the benefit of staged reasoning).

Evaluation with real student users produced strong results. Flashcard quality was rated 4.43 out of 5 on average. Study preparation time was reduced by 97 percent. Students generated more cards of higher quality in a fraction of the time. Twelve of fifteen student testers indicated they would use the application regularly. The project demonstrates that modern LLM technology, applied thoughtfully through a structured multi-step pipeline, can deliver genuine, measurable educational value.

## 8.2 Challenges Encountered

### 8.2.1 Prompt Engineering for Consistent Structured Output

The most significant technical challenge during development was ensuring that the LLM reliably produced output conforming to the required JSON schema across a wide variety of input texts. Early versions of the generator prompt produced well-formed flashcards for straightforward factual texts but struggled with more complex, argumentative, or narrative content. Cards from these texts were sometimes too long, too vague, or phrased as statements rather than questions.

This challenge was addressed iteratively through systematic prompt refinement. The rules for question formulation were made progressively more explicit, with specific prohibited patterns and explicit examples added to the prompt. The adoption of OpenAI's native structured output feature, enforced at the API level, eliminated the class of errors caused by malformed JSON. The addition of the validator node as a final quality gate caught the remaining cases where the output, while syntactically valid, failed the application's quality standards.

### 8.2.2 LLM Response Latency

The four-node pipeline involves multiple sequential LLM API calls, which results in total generation times of between three and fifteen seconds. This latency is inherent to the current generation of cloud LLM APIs and cannot be eliminated through application-side optimization. However, the user experience impact of this latency was mitigated through careful frontend design: the loading state is communicated clearly with a visible spinner and informative text, the text area is disabled to prevent confusion, and the transition to the results page uses a smooth animation to avoid visual disruption.

An architectural optimization that was considered but not implemented in this version is parallel execution of independent pipeline nodes. In the current design, all four nodes execute sequentially. However, it would be possible to execute the analyzer and extractor nodes in parallel (since neither depends on the other's output), reducing total latency by the time of whichever completes first. This optimization is planned for a future version.

### 8.2.3 Database Schema Evolution

During development, the understanding of the application's requirements evolved in ways that required schema changes. For example, the review_session_cards table was added partway through development when it became clear that session-level card outcome tracking was needed for the planned "review unknown cards only" feature. The addition of the audit_logs table was similarly introduced after the initial schema was defined.

Managing these schema changes without disrupting development databases required careful use of Alembic migrations. Each change was captured in a migration script, and the migration history was maintained throughout. This experience reinforced the importance of beginning a project with a migration strategy in place from the first day of development.

### 8.2.4 React State Management Complexity

As the frontend grew from a simple proof of concept to a multi-page application with five pages, cross-page state management became increasingly complex. The initial approach of passing state through React Router's location state (a mechanism for passing data between navigated pages) proved fragile — if the user navigated directly to a URL or refreshed the page, the state was lost. Migrating to Zustand for global state management resolved this issue and provided a more predictable and testable state management architecture.

## 8.3 Future Work

The user testing feedback and the development team's own assessment identify a clear set of enhancements for future versions of the application. These are organized by priority.

### 8.3.1 High Priority — Card Editing

The single most requested feature in user testing was the ability to edit the question or answer of a generated card before saving it to a deck. The current system presents generated cards as read-only. Adding an edit mode to the FlashCard component — a pencil icon that reveals text input fields for the question and answer — would address this directly. The backend already supports updating card content through the cards endpoint; only the frontend component and the user interaction need to be implemented. This feature is the top priority for the next development cycle.

### 8.3.2 High Priority — PDF and Document Upload

Students overwhelmingly keep their notes in PDF format. The inability to upload a PDF directly — requiring instead that the student copy and paste text from the PDF — is a significant friction point. Adding a file upload endpoint to the backend and a file picker to the frontend would allow students to upload PDF files directly. The server-side processing would extract the text from the PDF using a Python PDF extraction library, then pass it to the existing generation pipeline. For PDFs that are scanned images rather than digital text, an OCR step using a vision-capable LLM would be required.

### 8.3.3 High Priority — Anki Export

Many serious students already use Anki for long-term study with its scientifically optimized SM-2 spaced repetition algorithm. Providing an export function that generates an Anki-compatible .apkg package file from any saved deck would allow these students to benefit from both systems: the AI Flashcard Maker for rapid card generation, and Anki for long-term scheduled review. The python-genanki library provides the tools needed to generate .apkg files from Python data.

### 8.3.4 Medium Priority — SM-2 Spaced Repetition

Implementing the SM-2 algorithm in the review session system would transform the AI Flashcard Maker from a session-based study tool into a long-term learning companion. The algorithm requires storing, per card per user, the current interval (how many days until the next review), the ease factor (a multiplier that adapts based on past performance), and the next review date. The review_session_cards table already records the outcome of each card review; extending this with per-card scheduling data would enable full spaced repetition scheduling.

### 8.3.5 Medium Priority — Multi-Language Support

The current system primarily targets English-language input and output. Support for Arabic, the native language of the project team and many potential users, is an important priority. Modern LLMs are highly capable in Arabic, and generating Arabic flashcards requires primarily adjusting the prompts to instruct the model to respond in the same language as the input. The frontend would require Arabic right-to-left text support through CSS direction properties, and the database schema requires no changes. Testing with Arabic educational texts would be needed to validate output quality.

### 8.3.6 Medium Priority — Collaborative Deck Sharing

The is_public field in the decks table was included in anticipation of a deck-sharing feature. When a deck is made public, other users of the platform should be able to search for, view, and study the deck. This would create a community library of AI-generated flashcard decks organized by subject and topic. The backend would require new endpoints for searching and accessing public decks, and the frontend would require a discovery page with search and filter functionality.

### 8.3.7 Long-Term — Mobile Application

A dedicated mobile application, built using React Native to share code with the existing React web frontend, would significantly increase the application's accessibility. Mobile is the platform on which most students study on the go — during commutes, between classes, and before sleeping. The flashcard review mode is particularly well-suited to mobile use, where the card flip can be triggered by a tap or a swipe gesture.

### 8.3.8 Long-Term — Learning Analytics Dashboard

As the system accumulates data from many review sessions over time, it becomes possible to provide students with meaningful insights about their learning patterns. A learning analytics dashboard could display trends in session scores over time per deck, identify which cards a student consistently marks as unknown (indicating persistent gaps in knowledge), and show study streak data to motivate consistent review habits.

### 8.3.9 Long-Term — Intelligent Difficulty Adaptation

The current system assigns a fixed difficulty level to each card at generation time based on the LLM's assessment. A more sophisticated approach would adapt the difficulty of cards shown during review based on the student's demonstrated performance. Cards that the student consistently knows could be presented less frequently; cards that are consistently unknown could be prioritized. This dynamic difficulty adaptation would make the review mode significantly more efficient and personalized.

---

---

# References

1. Ebbinghaus, H. (1885). *Über das Gedächtnis: Untersuchungen zur experimentellen Psychologie*. Duncker & Humblot, Leipzig. (Translated as Memory: A Contribution to Experimental Psychology, translated by H. A. Ruger and C. E. Bussenius, 1913.)

2. Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. *Psychological Science*, 17(3), 249–255. https://doi.org/10.1111/j.1467-9280.2006.01693.x

3. Kornell, N., & Bjork, R. A. (2007). The promise and perils of self-regulated study. *Psychonomic Bulletin & Review*, 14(2), 219–224.

4. Pyle, W. H. (1913). Economical learning. *Journal of Educational Psychology*, 4(3), 148–158.

5. Wozniak, P. A. (1990). *Optimization of learning: A study on repetition spacing with the SuperMemo method*. Master's thesis, University of Technology, Poznań.

6. Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L., & Polosukhin, I. (2017). Attention is all you need. *Advances in Neural Information Processing Systems*, 30. https://arxiv.org/abs/1706.03762

7. Brown, T. B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., Neelakantan, A., Shyam, P., Sastry, G., Askell, A., et al. (2020). Language models are few-shot learners. *Advances in Neural Information Processing Systems*, 33, 1877–1901.

8. Wei, J., Tay, Y., Bommasani, R., Raffel, C., Zoph, B., Borgeaud, S., Yogatama, D., Bosma, M., Zhou, D., Metzler, D., et al. (2022). Emergent abilities of large language models. *Transactions on Machine Learning Research*. https://arxiv.org/abs/2206.07682

9. Ouyang, L., Wu, J., Jiang, X., Almeida, D., Wainwright, C. L., Mishkin, P., Zhang, C., Agarwal, S., Slama, K., Ray, A., et al. (2022). Training language models to follow instructions with human feedback. *Advances in Neural Information Processing Systems*, 35.

10. Bai, Y., Jones, A., Ndousse, K., Askell, A., Chen, A., DasSarma, N., Drain, D., Fort, S., Ganguli, D., Henighan, T., et al. (2022). Training a helpful and harmless assistant with reinforcement learning from human feedback. *arXiv preprint*. https://arxiv.org/abs/2204.05862

11. OpenAI. (2024). *GPT-4 technical report*. arXiv preprint arXiv:2303.08774. https://arxiv.org/abs/2303.08774

12. Anthropic. (2024). *Claude 3.5 Sonnet model card and system prompt*. Anthropic Technical Documentation. https://www.anthropic.com/claude/sonnet

13. Chase, H. (2022). LangChain [Software library]. GitHub. https://github.com/langchain-ai/langchain

14. LangChain AI. (2024). *LangGraph: Building stateful, multi-actor applications with LLMs*. LangChain Documentation. https://langchain-ai.github.io/langgraph/

15. Heilman, M. (2011). *Automatic factual question generation from text*. Doctoral dissertation, Language Technologies Institute, Carnegie Mellon University.

16. Kasneci, E., Seßler, K., Küchemann, S., Bannert, M., Dementieva, D., Fischer, F., Gasser, U., Groh, G., Günnemann, S., Hüllermeier, E., Krusche, S., Kutyniok, G., Michaeli, T., Nerdel, C., Pfeffer, J., Poquet, O., Sailer, M., Schmidt, A., Seidel, T., Stadler, M., Weller, J., Kuhn, J., & Kasneci, G. (2023). ChatGPT for good? On opportunities and challenges of large language models for education. *Learning and Individual Differences*, 103, 102274.

17. Devlin, J., Chang, M. W., Lee, K., & Toutanova, K. (2019). BERT: Pre-training of deep bidirectional transformers for language understanding. *Proceedings of NAACL-HLT 2019*, 4171–4186.

18. PostgreSQL Global Development Group. (2024). *PostgreSQL 16 documentation*. https://www.postgresql.org/docs/current/

19. Ramírez, S. (2019). FastAPI [Software framework]. GitHub. https://github.com/tiangolo/fastapi

20. SQLAlchemy Contributors. (2024). *SQLAlchemy 2.0 documentation*. https://docs.sqlalchemy.org/en/20/

21. React Team. (2024). *React documentation*. https://react.dev

22. Framer. (2024). *Framer Motion: Production-ready animation library for React*. https://www.framer.com/motion/

23. Tailwind Labs. (2024). *TailwindCSS documentation*. https://tailwindcss.com/docs

24. Alembic Contributors. (2024). *Alembic database migration tool documentation*. https://alembic.sqlalchemy.org/

25. Goldberg, D., Nichols, D., Oki, B. M., & Terry, D. (1992). Using collaborative filtering to weave an information tapestry. *Communications of the ACM*, 35(12), 61–70. (Referenced for the background on personalized recommendation systems as a precursor concept to adaptive learning.)

---

*This document constitutes the complete academic and technical report for the AI Flashcard Maker graduation project.*

*Submitted by: Abdulrahman Mohammed Zourob and Ibrahim Salah Al Najjar*

