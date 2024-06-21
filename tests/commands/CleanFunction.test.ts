import { CleanFunction } from './../../src/commands/CleanFunction';

// mocking out node:fs module
jest.mock('node:fs', () => {
    const originalModule = jest.requireActual('node:fs');
    return {
        __esModule: true,
        ...originalModule,
        readdirSync: jest.fn().mockReturnValue([
            'mockedFile_A.png',
            'mockedFile_B.png',
            'mockedFile_C.png',
            'mockedFile_D.png',            
        ]),
        unlinkSync: jest.fn(),
        existsSync: jest.fn().mockResolvedValue(true)
    };
});

describe.only('CleanFunction Unit Tests', () => {

    // asserts that when files exists in the given path and all files are deleted, we shall see N number of deleted files in our msg promise
    it('Happy Path :)', async () => 
    {
        // ARRANGE
        const command = new CleanFunction();
        // ACT
        const result = await command.executeAsync();
        // ASSERT
        expect(result).toContain("4");
    })
});