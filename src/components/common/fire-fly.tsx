const FireFly = ({ length = 16 }: { length?: number }) => {
  return Array.from({ length }).map((e, idx) => (
    <div key={`firefly-${idx}`} className="firefly" />
  ));
};

export default FireFly;
