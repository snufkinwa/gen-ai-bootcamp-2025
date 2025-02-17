# Architecting [ことばネクサス]

### **📌 Business Goal**

We’re designing architectural diagrams to make **GenAI adoption easier to understand** for stakeholders. The goal is to simplify decision-making by showcasing different **technical options** and guiding discussions on **risks, costs, and infrastructure choices**. This ensures stakeholders can make informed decisions **without vendor lock-in**.

We have a **$10-15K budget** and are supporting **300 students in Nagasaki**. To maintain **data privacy, long-term affordability, and avoid high managed service costs**, we plan to **build and manage our own infrastructure** instead of relying on fully managed AI services.

### **📌 Technical Considerations**

To communicate our **GenAI architecture effectively**, we will create three levels of diagrams:

- **Conceptual** → High-level overview for business stakeholders.
- **Logical** → Breakdown of technical components without deep implementation details.
- **Physical** → Low-level details needed for actual implementation.

### **📌 Model Selection and Development**

We’re using **[Mistral 7B](https://huggingface.co/mistralai/Mistral-7B)**, an **open-source model** with **traceable training data** to avoid copyright risks. Hosting **Mistral 7B on our own infrastructure** ensures we **retain full control over data, reduce long-term costs, and fine-tune the model as needed**.

Additionally, we have **$100 in AWS credits** from a **hackathon**, which allows us to experiment with **Claude (Anthropic), Cohere, or Meta models** on **Amazon Bedrock**. Since Bedrock charges on a **token basis** (e.g., ~$0.008 per 1,000 input tokens), we will optimize usage by:

- **Keeping responses concise** to minimize token consumption.
- **Monitoring AWS billing** to avoid unexpected costs.
- **Batch processing requests** to maximize efficiency.

By **combining** **Mistral 7B (self-hosted, cost-effective)** with **AWS Bedrock (scalable cloud AI)**, we create a **balanced AI deployment** that is both flexible and affordable.

### **📌 Logical Setup – AWS Configuration**

Since we have **$119 in AWS credits**, we’ll strategically use AWS services for **initial deployment and testing** while ensuring **future scalability**.

**Planned AWS Setup:**

- **Compute:** EC2 instances with **GPU support** for model inference.
- **Storage:** Amazon S3 for **datasets, model checkpoints, and logs**.
- **Networking:** VPC with **security groups** for controlled access.
- **Scaling:** Auto Scaling to **handle increased user demand**.
- **Monitoring:** CloudWatch to **track system performance, API usage, and costs**.

This setup **maximizes our AWS credits** while keeping our **infrastructure flexible and adaptable** for future expansion.
