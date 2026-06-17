export function Header(){
    return (
        <box justifyContent="center" alignItems="center"> 
            <box flexDirection="row" justifyContent="center" gap={0.5} alignItems="center">
                <ascii-font font="tiny" text="Forge" color="#a2bffe" backgroundColor="transparent"/>
                <ascii-font font="tiny" text="Code" color="grey"/>
            </box>
        </box>
    ); 
}