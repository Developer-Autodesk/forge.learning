# What's Microsoft Azure?
[Microsoft Azure](https://azure.microsoft.com/en-us/overview/what-is-azure/) is an ever-expanding set of cloud services to build, manage, and deploy applications on a massive, global network of Microsoft-managed data centers, using your favorite tools and frameworks. Azure provides a directory of hundreds of different services you can use, including software as a service (SaaS), platform as a service (PaaS) and infrastructure as a service (IaaS) and supports many different programming languages, tools and frameworks, with both Microsoft-specific and third-party software and systems, encompassing full virtual machines, databases, file storage, backups, and services for mobile and web apps.
![](_media/deployment/azure/1715.AzureArch.png)

Azure is generally available in 42 regions around the world. Microsoft has announced an additional 12 regions to be opened soon (as of October 2018). Microsoft is the first hyper-scale cloud provider that has committed to building facilities on the continent of Africa with two regions located in South Africa. An Azure geography contains multiple Azure Regions, such as example “North Europe” (Dublin, Ireland), “West Europe” (Amsterdam, Netherlands). Where a location represents the city or area of the Azure Region. Each Azure Region is paired with another region within the same geography; this makes them a regional pair. In this example, Amsterdam and Dublin are the locations which form the regional-pair.
![](_media/deployment/azure/dc-dist.png)

You can manage your Azure account Build, manage, and monitor your cloud applications—and manage your account and billing, through the [Azure portal](https://azure.microsoft.com/en-us/account/). Another option is the Azure command-line interface (CLI), which is Microsoft's cross-platform command-line experience for managing Azure resources. Use it in your browser with Azure Cloud Shell, or install it on macOS, Linux, or Windows and run it from the command line. And here's its options:

- To run in your browser with Azure Cloud Shell, see [Quickstart for Bash in Azure Cloud Shell or Quickstart](https://docs.microsoft.com/en-us/azure/cloud-shell/quickstart) for [PowerShell in Azure Cloud Shell](https://docs.microsoft.com/en-us/azure/cloud-shell/quickstart-powershell).
- To install the CLI, see [Install the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).
- To run as a Docker container, see [Run Azure CLI in a Docker Container](https://docs.microsoft.com/en-us/cli/azure/run-azure-cli-docker?view=azure-cli-latest)


# What is Azure App Service?
Azure App Service is a service for hosting web applications, REST APIs, and mobile back ends. You can develop in your favorite language, be it .NET, .NET Core, Java, Ruby, Node.js, PHP, or Python. Applications run and scale with ease.

### App Service vs Virtual Machine

Azure App Service is the best choice for most web apps. Deployment and management are integrated into the platform, sites can scale quickly to handle high traffic loads, and the built-in load balancing and traffic manager provide high availability.

Azure Virtual Machines is Infrastructure-as-a-Service (IaaS), while App Service is Platform-as-a-Service (Paas). If you are considering Azure Virtual Machines, make sure you take into account the ongoing maintenance effort required to patch, update, and manage your VM environment.

As a PaaS platform, Azure App Service enables you go through the different stages of app development smoothly, thereby offering the perfect environment, minus the worries of building and maintaining the underlying infrastructure that’s required for the development process.
![](_media/deployment/azure/PaaS.png)


# Benefits of Using PaaS for Web App Development and Hosting
- Quicker deployment

  The time taken for app deployment is less, because you can eliminate the many steps involved in setting the basics of your applications. After deployment, you can integrate, adapt or scale your app anytime.

- Cost effectiveness

  One of the biggest advantages of PaaS is that you can use advanced development software, business intelligence and analytics tools without actually purchasing them

- Simplifies operations

  PaaS offerings can cut down the complexity of their operations because the provider manages everything - OS, virtualization, servers, storage, networking, and the PaaS software

- Incredible insight into app usage

  The platform lets you determine user behavior and app utilization by analyzing the usage patterns and interactions. This way they would be able to focus on the features that users are most interested in, and improve the ones that were not popular.

### Pricing
![](_media/deployment/azure/Pricing-Model-Comparison.png)


# Further Readings
- [Azure App Service, Virtual Machines, Service Fabric, and Cloud Services comparison](https://docs.microsoft.com/en-us/azure/app-service/choose-web-site-cloud-service-vm)
- [Azure-App-Service-in-depth](https://channel9.msdn.com/Blogs/MostafaElzoghbi/Azure-App-Service-in-depth)
