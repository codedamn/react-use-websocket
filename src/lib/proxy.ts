import { MutableRefObject } from 'react'

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
	? 1
	: 2
	? A
	: B

type WritableKeys<T> = {
	[P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T]

export const websocketWrapper = (
	webSocket: WebSocket,
	start: MutableRefObject<() => void>
): WebSocket => {
	return webSocket
}

export default websocketWrapper
