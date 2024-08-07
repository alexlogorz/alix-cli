import { CommandService } from '../../src/services/CommandService';
import { HelpCommand } from './../../src/commands/HelpCommand';
import type { ICommand } from './../../src/models/ICommand';

describe('HelpCommand Unit Tests', function helpCommand()
{
    let command: ICommand;
    const commandService: CommandService = new CommandService();

    beforeEach(function setup()
    {
        // ARRANGE
        command = new HelpCommand(commandService);
    });

    it('should output instructions on various operations', function shouldDisplayHelpOptions()
    {
        command
            .executeAsync()// ACT
            .then(helpInstructions => {
                // ASSERTIONS
                expect(helpInstructions).toContain("alix title");
                expect(helpInstructions).toContain("alix images");
                expect(helpInstructions).toContain("alix set");
                expect(helpInstructions).toContain("alix clean");
                expect(helpInstructions).toContain("alix desc");
                expect(helpInstructions).toContain("alix help");
            });
    });

    it('should output information about its version', function shouldDisplayHelpOptions()
    {
        command
            .executeAsync()// ACT
            .then(helpInstructions => {
                // ASSERTION
                const versionRegex = /version \d+\.\d+\.\d+/; // This regex matches "version ", followed by three sequences of digits separated by periods
                expect(helpInstructions).toMatch(versionRegex);
            });
    });

});