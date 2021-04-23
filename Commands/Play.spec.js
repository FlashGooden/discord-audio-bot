import play from "./Play";

describe("Tests the play function", () => {
   it("will error if you are not in a voice channel", async () => {
      const mockArg = jest.fn();
      const mockMessage = jest.fn(() => {
         return {
            reply: (message) => message,
            member: { voice: { channel: false } },
         };
      });
      mockArg.mockReturnValue("cat");
      await play(mockMessage('You need to join a voice channel first!'), mockArg);
      expect(mockMessage).toHaveBeenCalledWith("You need to join a voice channel first!")
   });

   it("will join channel to play mp3 if command is available and user is in room", async () => {
      let joinedChannel = 0;
      const mockMessage = jest.fn();
      mockMessage.mockReturnValue({
         reply: () => "You need to join a voice channel first!",
         member: { voice: { channel: { join: () => joinedChannel++ } } },
      });
      const mockArg = jest.fn();
      mockArg.mockReturnValue("cat");

      await play(mockMessage(), mockArg);
      expect(joinedChannel).toEqual(1);
   });
});
