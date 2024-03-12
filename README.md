# Overview

This is an online SQL editor developed by using React + Vite. It contains a data dump which is used from this repository. The sections below detail the salient features of this project.
## Features

- **RUN SQL Query based on columns**: Users can execute queries based on table columns to filter data effectively.

- **Dynamic Result Table Data**: Display the response of the executed query dynamically, based on the selected table or column-based query data.

- **Tabs based Data**: Utilize tabs to present the resulting query data and also display the queried columns along with their respective types.

- **Custom Table Column Data**: isualize table data in a structured format, presenting column names and their corresponding data types.

## Optimization

- **Dynamic Data fetching**: The queried data is fetched dynamically, triggered only when the user requests it. This feature enhances performance by minimizing unnecessary data loading.

- **Pagination Method**: To enhance readability, we provide a pagination method allowing users to navigate through data based on their preferences.

- **Minimal plugins**: Our approach involves minimal plugin usage. We utilize only one plugin as part of icon, while the rest of the components including Tabs, Pagination, and Loader are custom-built. Additionally, we refrain from using any plugins for styling purposes.

- **Create hooks/helper function to optimize code**: To optimize code performance, we leverage hooks and helper functions. For instance, we utilize the useQueryData hook, which is solely responsible for fetching data from the API. This ensures a streamlined and efficient data retrieval process.

## Installation and Usage

In the project directory, run the following commands:
npm run start

This command runs the app in development mode. Open http://localhost:5173 to view it in the browser.

npm run build

This command builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include hashes. Your app is now ready to be deployed!

See the section about deployment for more information.