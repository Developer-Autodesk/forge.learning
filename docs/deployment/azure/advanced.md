# _Advanced Topics - Azure App Service_

# Custom Domain Name
You can use either a CNAME record or an A record to map a custom DNS name to App Service. Follow the respective steps:
- Map a CNAME record
- Map an A record
- Map a wildcard domain (with a CNAME record)
- Read on [here](https://docs.microsoft.com/en-us/Azure/app-service/app-service-web-tutorial-custom-domain) for details

![](https://docs.microsoft.com/en-us/Azure/app-service/media/app-service-web-tutorial-custom-domain/cname-record.png)

![](https://docs.microsoft.com/en-us/Azure/app-service/media/app-service-web-tutorial-custom-domain/custom-domain-menu.png)

![](https://docs.microsoft.com/en-us/Azure/app-service/media/app-service-web-tutorial-custom-domain/validate-domain-name-cname.png)

# Security

The platform components of App Service, including Azure VMs, storage, network connections, web frameworks, management and integration features, are actively secured and hardened. App Service goes through vigorous compliance checks on a continuous basis to make sure that:

- Your app resources are secured from the other customers' Azure resources.
- VM instances and runtime software are regularly updated to address newly discovered vulnerabilities.
- Communication of secrets (such as connection strings) between your app and other Azure resources (such as SQL Database) stays within Azure and doesn't cross any network boundaries. Secrets are always encrypted when stored.
- All communication over the App Service connectivity features, such as hybrid connection, is encrypted.
- Connections with remote management tools like Azure PowerShell, Azure CLI, Azure SDKs, REST APIs, are all encrypted.
- 24-hour threat management protects the infrastructure and platform against malware, distributed denial-of-service (DDoS), man-in-the-middle (MITM), and other threats.

### HTTPS and Certificates

- App Service certificate - Create a certificate directly in Azure. The certificate is secured in Azure Key Vault, and can be imported into your App Service app
- Third-party certificate - Upload a custom SSL certificate that you purchased from a trusted certificate authority and bind it to your App Service app. App Service supports both single-domain certificates and wildcard certificates. It also supports self-signed certificates for testing purposes

Read on [here](https://docs.microsoft.com/en-us/azure/app-service/overview-security) for details

# Load Balancing
An ASE can be deployed with an internet accessible endpoint or with an IP address in your VNet. In order to set the IP address to a VNet address you need to deploy your ASE with an Internal Load Balancer(ILB). When your ASE is configured with an ILB, you provide:

- your own domain or subdomain
- the certificate used for HTTPS
- DNS management for your subdomain.

In return, you can do things such as:

- host intranet applications, like line-of-business applications, securely in the cloud that you access through a Site to Site or ExpressRoute VPN
- host apps in the cloud that are not listed in public DNS servers
- create internet isolated backend apps with which your front-end apps can securely integrate

Read on [here](https://docs.microsoft.com/en-us/azure/app-service/environment/app-service-environment-with-internal-load-balancer) for details.

# Backup and Restore

- What gets backed up

  App Service can back up the following information to an Azure storage account and container that you have configured your app to use.

   - App configuration
   - File content
   - Database connected to your app

  The following database solutions are supported with backup feature:

   - SQL Database
   - Azure Database for MySQL
   - Azure Database for PostgreSQL
   - MySQL in-app

  Read on [here](https://docs.microsoft.com/en-us/azure/app-service/manage-backup) for details.

- Restore an app

  Azure App Service supports the following databases for backup and restore:
  - SQL Database
  - Azure Database for MySQL
  - Azure Database for PostgreSQL
  - MySQL in-app

  Read on [here](https://docs.microsoft.com/en-us/azure/app-service/web-sites-restore) for details.

![](_media/deployment/azure/backuprestore.png)

# Elasticity and Autoscaling
Azure App Service environments support autoscaling. You can autoscale individual worker pools based on metrics or schedule

Autoscaling optimizes your resource utilization by automatically growing and shrinking an App Service environment to fit your budget and or load profile

Read on [here](https://docs.microsoft.com/en-us/azure/app-service/environment/app-service-environment-auto-scale) for details.
![](https://docs.microsoft.com/en-us/azure/app-service/environment/media/app-service-environment-auto-scale/introduction.png)

# Futher Readings
- [Integrate your app with an Azure Virtual Network](https://docs.microsoft.com/en-us/azure/app-service/web-sites-integrate-with-vnet)
- [https://docs.microsoft.com/en-us/azure/app-service/environment/network-info](https://docs.microsoft.com/en-us/azure/app-service/environment/network-info)
- [Scale up an app in Azure](https://docs.microsoft.com/en-us/Azure/app-service/web-sites-scale)
- [Migration checklist when moving to Azure App Service](https://azure.microsoft.com/en-us/blog/migration-checklist-when-moving-to-azure-app-service/?cdn=disable)
- [Azure App Services Security](https://blogs.msdn.microsoft.com/wriju/2017/04/23/azure-app-services-security/)
- [Authentication and authorization in Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/overview-authentication-authorization)
