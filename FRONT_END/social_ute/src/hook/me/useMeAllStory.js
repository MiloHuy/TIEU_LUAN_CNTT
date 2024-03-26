import { useCallback, useState } from "react";
import { getAllStory } from "services/story.svc";

export const useMeAllStory = () => {
  const [stories, setStories] = useState([]);
  const fetchMeStories = useCallback(async () => {
    try {
      const dataStories = await getAllStory();
      setStories(dataStories);
    } catch (error) {
      console.log("Error: ", error);
    }
  }, []);

  return {
    stories,
    fetchMeStories,
  };
};
