interface IProps {
  selectedDays: number[];
  onToggleDay: ({ dayId }: { dayId: number }) => void;
}

const daysOfWeek = [
  { id: 1, name: "Dushanba", short: "Du", color: "#1890ff" },
  { id: 2, name: "Seshanba", short: "Se", color: "#52c41a" },
  { id: 3, name: "Chorshanba", short: "Chor", color: "#faad14" },
  { id: 4, name: "Payshanba", short: "Pay", color: "#722ed1" },
  { id: 5, name: "Juma", short: "Ju", color: "#eb2f96" },
  { id: 6, name: "Shanba", short: "Sha", color: "#13c2c2" },
  { id: 7, name: "Yakshanba", short: "Yak", color: "#fa8c16" },
];

const ToggleCards: React.FC<IProps> = ({ selectedDays, onToggleDay }) => {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h3 style={{ marginBottom: "16px", color: "#262626" }}>
        Variant 1: Toggle Cards ⭐⭐⭐
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {daysOfWeek.map((day) => {
          const isSelected = selectedDays.includes(day.id);

          return (
            <div
              key={day.id}
              onClick={() => onToggleDay({ dayId: day.id })}
              style={{
                padding: "10px 20px",
                fontSize: "14px",
                cursor: "pointer",
                borderRadius: "24px",
                border: `2px solid ${isSelected ? day.color : "#d9d9d9"}`,
                backgroundColor: isSelected ? day.color : "white",
                color: isSelected ? "white" : "#595959",
                fontWeight: isSelected ? "600" : "500",
                transition: "all 0.2s",
                userSelect: "none",
              }}
            >
              {day.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToggleCards;
