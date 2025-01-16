# Advanced React To-Do Application with API Integration

## Objective

Enhance the basic To-Do application by integrating external API data, implementing advanced state management using Redux, and ensuring the application is responsive and user-friendly across different devices.

## Design

[Figma Design Link](https://www.figma.com/design/DAQXWhcqjf4idJCClGNQqt/Front-End-Developer?node-id=0-1&t=suUJGaYF7bBUdXJz-0)

## Requirements

### Frontend Development and API Integration

- **HTML**: Structure the application's layout.
- **CSS**: Style the application using CSS or frameworks like Bootstrap or Material-UI.
- **JavaScript (ES6 or later)**: Implement the application logic.
- **API Integration**: Integrate with a public API (e.g., weather API) to display relevant data.
- **Error Handling**: Implement error handling for API requests to manage and display errors gracefully.

### React Components and Advanced State Management

- **Functional Components**: Use React hooks (`useState`, `useEffect`).
- **Components**:
  - `TaskInput`: Component for adding a new task.
  - `TaskList`: Component for displaying the list of tasks.
- **Redux Thunk or Redux Saga**: Handle asynchronous actions (e.g., API calls).

### Responsive Design

- Ensure the application is fully responsive across mobile, tablet, and desktop devices using CSS Grid and Flexbox.
- Implement a mobile-first design approach.

### Functionality

- **Add Task**: Users can input a task and add it to the list.
- **View Tasks**: Display all added tasks in a list format.
- **Delete Task**: Each task should have a delete button to remove it from the list.
- **Task Prioritization**: Allow users to set priorities for tasks (High, Medium, Low) and display them accordingly.
- **Persistent Storage**: Use local storage or session storage to save tasks and authentication status.

### User Authentication

- Implement a simple user authentication feature (login/logout) using Redux for state management.
- Protect the To-Do list behind authentication, ensuring tasks are only visible to logged-in users.

## Additional Instructions

- Follow best practices for organizing your project structure.
- Prioritize clean code and maintainability to ensure scalability.
