export class NotFoundException extends Error
{
    constructor(resourceName: string)
    {
        super(`${resourceName} could not be found`);
    }
    public readonly name = "Not Found";
}