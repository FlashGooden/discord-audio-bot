import { play } from "./Play";

describe("The Play function", () => {
   it("throws an error if you are not in a voice channel", () => {
      const mockArg = jest.fn();
      const mockMessage = jest.fn(() => {
         return {
            reply: (message) => message,
            member: { voice: { channel: false } },
         };
      });
      mockArg.mockReturnValue("cat");
      play(mockMessage("You need to join a voice channel first!"), mockArg);
      expect(mockMessage).toHaveBeenCalledWith(
         "You need to join a voice channel first!"
      );
   });

   it("joins a channel to play mp3 if command is available and user is in room", () => {
      let joinedChannel = 0;
      const mockMessage = jest.fn();
      mockMessage.mockReturnValue({
         reply: () => "You need to join a voice channel first!",
         member: { voice: { channel: { join: () => joinedChannel++ } } },
      });
      const mockArg = jest.fn();
      mockArg.mockReturnValue("cat");

      play(mockMessage(), mockArg);
      expect(joinedChannel).toEqual(1);
   });
});
