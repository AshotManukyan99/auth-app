# MyMonorepos

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer">
  <img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45">
</a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)  
or run `npx nx graph` to visually explore what was created.

---

## 📦 Running with Docker

To run the project inside a Docker container:

1. **Ensure Docker is installed and running locally**

   You can download Docker from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

2. **Build the Docker image**

   ```sh
   docker build -t auth-app .
   
3. 🚀 Run the Docker container

docker run -d -p 8080:80 auth-app

4. Verify the container is running
   ```sh
   docker ps
5. After that check this port manually <http://localhost:8080>  

# MyMonorepos

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

---

## 🚀 Running the Project Without Docker

If you’re running this project **outside Docker** (e.g. after cloning the repo), follow these steps:

1. **Switch Node.js version using `nvm`**  
   Make sure you have `nvm` installed, then run:

   ```sh
   nvm use
   
2. Install dependencies using Yarn
Always use Yarn in this workspace:

3. Start the development server with Nx
npx nx serve auth-app

<--------------------->

# MyMonorepos

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve auth-app
```

To create a production bundle:

```sh
npx nx build auth-app
```

To see all available targets to run for a project, run:

```sh
npx nx show project auth-app
```
        
These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
