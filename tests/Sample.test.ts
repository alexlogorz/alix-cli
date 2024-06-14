

// we are able to create a grouping of test using the `describe` method
describe("Sample Group | Unit Tests", function sampleGroup()
{
    it('should return uppercase', function returnsUpperCase()
    {
        // ARRANGE
        const original = 'abc';
        const expected = 'ABC';
        // ACT
        const result = original.toUpperCase();
        // ASSERT
        expect(expected).toBe(result);
    });
});