# Stage 1: Build the application
# This stage uses a Maven image to build the Spring Boot application JAR file.
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project definition file
COPY pom.xml .

# Copy the rest of the source code
COPY src ./src

# Build the project and create the executable JAR. Tests are skipped for faster builds.
RUN mvn clean install -DskipTests

# Stage 2: Run the application
# This stage uses a minimal JRE image to run the application for a smaller footprint.
FROM eclipse-temurin:21-jre-jammy

# Set the working directory
WORKDIR /app

# Copy the executable JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the application runs on (default for Spring Boot is 8080)
EXPOSE 8080

# Set the entrypoint to run the Spring Boot application
# The application will automatically pick up environment variables for configuration.
ENTRYPOINT ["java", "-jar", "app.jar"]
