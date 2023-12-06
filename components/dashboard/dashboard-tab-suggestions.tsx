import SuggestionCards from "./suggestion-cards";
import { ISuggestionItem } from "@/store/rateios/rateios.reducer";

interface DashboardTabSuggestionsProps {
  suggestions: ISuggestionItem[];
}
const DashboardTabSuggestions = ({
  suggestions,
}: DashboardTabSuggestionsProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      {/* <ParticipantsSummaryRow list={list} total={total} /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {suggestions.map((suggestion) => (
          <SuggestionCards
            key={suggestion.name}
            name={suggestion.name}
            value={suggestion.value}
            receives={suggestion.receives}
            pays={suggestion.pays}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardTabSuggestions;
