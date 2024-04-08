import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { AppConfigurationClient } from '@azure/app-configuration';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const connectionString = process.env.AZURE_APP_CONFIG_CONNECTION_STRING;
    context.log(`Connection string: ${connectionString}`);
    const configClient = new AppConfigurationClient(connectionString);
    const productsAmount = await configClient.getConfigurationSetting({ key: 'PRODUCTS_AMOUNT' });
    context.log(`Products amount: ${productsAmount.value}`);

    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;