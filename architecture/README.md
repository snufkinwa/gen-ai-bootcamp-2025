# Architecting [ことばネクサス]

## Business Goal

We’re creating architectural diagrams to make GenAI easier to understand for stakeholders. The goal is to simplify decision-making by showing different technical options and helping navigate uncertainties in adopting GenAI. This way, stakeholders can make informed choices without feeling locked into a single solution.

We have a **$10-15K budget** and are supporting **300 students in Nagasaki**. Our plan is to build our own infrastructure to keep data private, avoid high managed service costs, and ensure long-term affordability.

## Technical Considerations

We’ll use three levels of diagramming:

- **Conceptual** – A big-picture view for business stakeholders.
- **Logical** – A breakdown of key technical components without too much detail.
- **Physical** – A deep dive into the specifics needed for implementation.

## Model Selection and Development

Using [Mistral 7B](https://huggingface.co/mistralai/Mistral-7B), an open-source model with traceable training data to avoid copyright issues.

## Logical Setup - AWS Configuration

Since we have **$119 in AWS credits**, we will utilize AWS services for initial deployment and testing. The setup includes:

- **Compute**: EC2 instances with GPU support for model inference.
- **Storage**: S3 for dataset storage and model checkpoints.
- **Networking**: VPC setup with security groups to manage access.
- **Scaling**: AWS Auto Scaling for handling increased usage.
- **Monitoring**: CloudWatch to track system performance and costs.

This logical setup ensures we maximize our credits while maintaining flexibility for future scalability.
