import { Button } from "@/components/ui/button"
import CursorGrid from '@/components/CursorGrid';
import LineSidebar from '@/components/LineSidebar';



export function App() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
      
          <h1 className="font-medium">Welcome!</h1>
          <p>Insert witty paragraph.</p>
          <p>insert follow-up text here.</p>
          <Button className="mt-2">Contact Me</Button>
          <LineSidebar
  items={['Overview', 'Skills', 'My Works', 'Backgrounds', 'Showcase']}
  accentColor="#00B8DB"
  textColor="#c4c4c4"
  markerColor="#6c6c6c"
  showIndex
  showMarker
  proximityRadius={100}
  maxShift={30}
  falloff="smooth"
  markerLength={60}
  markerGap={0}
  tickScale={0.5}
  scaleTick
  itemGap={20}
  fontSize={1.1}
  smoothing={100}
  defaultActive={0}
  onItemClick={(index, label) => console.log(index, label)}
/>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>


<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <CursorGrid
    cellSize={70}
    color="#00B8DB"
    radius={140}
    falloff="smooth"
    holdTime={400}
    fadeDuration={800}
    lineWidth={1.2}
    maxOpacity={1}
    fillOpacity={0}
    gridOpacity={0}
    cellRadius={0}
    clickPulse
    pulseSpeed={600}
  />
</div>
    </div>
  )
}

export default App



