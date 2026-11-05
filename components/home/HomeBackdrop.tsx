import { Bat } from "../icons";
import { GraveyardScene } from "./GraveyardScene";

function Branches({ side }: { side: "left" | "right" }) {
  return (
    <div className={`branches branches-${side}`} aria-hidden="true">
      <span className="branch-main" />
      <span className="branch branch-one" />
      <span className="branch branch-two" />
      <span className="branch branch-three" />
      <span className="twig twig-one" />
      <span className="twig twig-two" />
    </div>
  );
}

export function HomeBackdrop() {
  return (
    <>
      <div className="stars" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <Branches side="left" />
      <Branches side="right" />
      <div className="moon" aria-hidden="true">
        <span className="moon-crater moon-crater-one" />
        <span className="moon-crater moon-crater-two" />
        <span className="moon-crater moon-crater-three" />
      </div>
      <div className="bat-swarm" aria-hidden="true">
        <Bat className="bat bat-one" />
        <Bat className="bat bat-two" />
        <Bat className="bat bat-three" />
        <Bat className="bat bat-four" />
      </div>
      <div className="fog fog-one" aria-hidden="true" />
      <div className="fog fog-two" aria-hidden="true" />
      <div className="fog fog-three" aria-hidden="true" />
      <GraveyardScene />
    </>
  );
}
