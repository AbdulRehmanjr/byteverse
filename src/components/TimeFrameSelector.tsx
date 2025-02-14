interface TimeFrameSelectorProps {
    selectedTimeFrame: string;
    onTimeFrameChange: (timeFrame: string) => void;
  }
  
  export const TimeFrameSelector = ({
    selectedTimeFrame,
    onTimeFrameChange
  }: TimeFrameSelectorProps) => {
    const timeFrames = ['week', 'month', 'quarter', 'year', 'all'];
  
    return (
      <div className="flex justify-end gap-4 text-sm">
        {timeFrames.map((period) => (
          <button
            key={period}
            className={`${
              selectedTimeFrame === period
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            } pb-1`}
            onClick={() => onTimeFrameChange(period)}
          >
            {period}
          </button>
        ))}
      </div>
    );
  };