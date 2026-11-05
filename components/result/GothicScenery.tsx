export function GothicScenery() {
  return (
    <div className="gothic-scenery" aria-hidden="true">
      <div className="blood-moon">
        <span />
      </div>
      <svg className="bats" viewBox="0 0 220 70">
        <path d="M5 32c12-12 24-9 34 1 5-11 13-17 24-18-7 7-9 15-8 23-11-6-21-5-31 2-6-6-12-8-19-8Zm82-11c10-10 20-8 29 0 4-9 11-14 20-15-6 6-8 13-7 20-9-5-18-4-26 2-5-5-10-7-16-7Zm67 26c12-12 24-9 34 1 5-11 13-17 24-18-7 7-9 15-8 23-11-6-21-5-31 2-6-6-12-8-19-8Z" />
      </svg>
      {["coffin-left", "coffin-right"].map((position) => (
        <svg
          key={position}
          className={`coffin ${position}`}
          viewBox="0 0 120 260"
        >
          <path d="M38 7h44l31 56-17 185H24L7 63 38 7Z" />
          <path d="M42 21h36l22 46-15 166H35L20 67l22-46Z" />
          <path
            className="coffin-cross"
            d="M56 73h8v38h17v8H64v49h-8v-49H39v-8h17V73Z"
          />
        </svg>
      ))}
      <div className="grave-cross cross-left">
        <i />
        <span />
      </div>
      <div className="grave-cross cross-right">
        <i />
        <span />
      </div>
      <div className="ground-fog fog-one" />
      <div className="ground-fog fog-two" />
    </div>
  )
}
