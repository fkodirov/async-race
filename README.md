# Async Race
![image](https://github.com/fkodirov/async-race/assets/111504283/3fe27a0b-06fa-4e10-9172-90299608c617)

## Task "Async Race"

Your customer has an idea to spend his money. He has hired some engineers who installed radio-controlled equipment :radio: in real cars :car:, to be precise, all of his collection of cars. He is eager to create a kind of drag-racing competition in order to discover which car is the fastest.

Each radio controller has an HTTP-compatible interface. It lets you start or stop the engine of the car and, of course, enable "driving" mode.

Your task is to create a [SPA](https://en.wikipedia.org/wiki/Single-page_application) to manage the collection of cars, operate their engines, and show race statistics.

Previously, development of this application had been started by a Belarusian developer named Dzmitry (and was almost finished). However, his laptop :computer: was stolen by bad guys. Unfortunately, we don't have any sources of UI :disappointed:. Fortunately, he had recorded some [demo](https://youtu.be/sTXtlBLh-Ts) beforehand. Additionally, he had stored the server mock in his [repo](https://github.com/mikhama/async-race-api).

We found in the latest news that a new company called "The Fast and the Furious" announced the release of a new product that will really blow people's minds. There isn't a lot of information about this product. All we know is that it's about "easier car management than you can imagine." It's exactly what our thieves :supervillain: are up to. They're going to release their product in two weeks. But we can't allow them to do that. We must be first.

What are you waiting for? Let's start coding!

## 🎯 Objectives

- **Create a Single Page Application (SPA)**: Manage a collection of cars, operate their engines, and showcase race statistics in an engaging, interactive SPA.
- **Revive the Project**: Drawing inspiration from a demo video and a server mock, reconstruct the UI and breathe life back into this ambitious project.
- **Outpace the Competition**: Implement the project with speed and efficiency, ensuring we launch before our rivals, showcasing our innovative solution to car management and racing competitions.

## 🚗 Functional Requirements

### Basic Structure

- Two main views: "Garage" and "Winners", each with their name, page number, and a count of items in the database.
- Persistent view state between switches, maintaining user input and pagination.

### Garage View

- CRUD operations for cars with "name" and "color" attributes.
- Color selection from an RGB palette with a preview of the car in the chosen color.
- Pagination to display cars (7 per page) and a feature to generate 100 random cars at once.

### Car Animation

- Start/stop engine buttons with corresponding animations and handling of engine states.
- Adaptive animations that work on screens as small as 500px.

### Race Animation

- A button to start a race for all cars on the current page.
- A reset button to return all cars to their starting positions.
- Display the winner's name upon race completion.

### Winners View

- Display winning cars with their image, name, number of wins, and best time.
- Pagination and sorting capabilities by wins and best times.

## 📜 Non-functional Requirements

- **No Libraries/Frameworks**: Pure TypeScript only, optional use of Bootstrap for CSS.
- **TypeScript Mandatory**: Strong typing throughout, with no use of "any".
- **Modular Architecture**: Clear separation of concerns between API interaction, UI rendering, and state management.
- **SPA Implementation**: Entire content generated via TypeScript, utilizing Webpack or similar for bundling.
- **Code Quality**: Adherence to Airbnb's ESLint configuration, with functions limited to 40 lines and avoidance of magic numbers/strings.

## 🛠️ Technical Implementation

- Implement CRUD operations for cars using the provided server mock.
- Design UI elements for car management and race controls.
- Utilize fetch for server communication, and handle promises for asynchronous tasks.
- Create animations for car movements using JavaScript and CSS.
- Ensure responsiveness and compatibility across different devices and browsers.

## Tech Stack
TypeScript, HTML, CSS, Webpack, ESLint


## Deployment
Проект доступен по адресу: https://rolling-scopes-school.github.io/fkodirov-JSFE2022Q3/async-race/ 

[Server Mock Repo](https://github.com/mikhama/async-race-api)


## Authors

- [Farkhod Kodirov](https://github.com/fkodirov)
