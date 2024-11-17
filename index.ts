import("dotenv").then(dotenv => {
    dotenv.config()
    import('./structures/Sharder.ts').then(
        module => { 
            const { ErryClusterManager } = module; 
            new ErryClusterManager(); 
        })
})
  