'use client'

import { diffChars as differ } from 'diff'
import { useEffect, useRef, useState } from 'react'

interface DiffPart {
  value: string
  added?: boolean
  removed?: boolean
}

export function HTMLChangesObserver({ children }: React.PropsWithChildren) {
  const targetNode = useRef<HTMLDivElement>(null)
  const [diff, setDiff] = useState<DiffPart[]>([])

  useEffect(() => {
    let lastHtml = targetNode.current!.innerHTML

    function observeChanges() {
      const newHtml = targetNode.current!.innerHTML
      if (newHtml != lastHtml) {
        const diffResult = differ(lastHtml, newHtml)
        lastHtml = newHtml
        logDiff(diffResult)
        setDiff(diffResult)
      }
      if (running) {
        requestAnimationFrame(observeChanges)
      }
    }

    let running = true
    // MutationObserver was too slow and batched changes together,
    // so we use requestAnimationFrame
    requestAnimationFrame(observeChanges)

    return () => {
      running = false
    }
  }, [])

  const renderDiffAsHTML = (diffParts: DiffPart[]) => {
    if (diffParts.length === 1 && diffParts[0] && diffParts[0].added !== true && diffParts[0].removed !== true) {
      return null
    }

    return (
      <div className="whitespace-pre-wrap font-mono text-sm">
        {diffParts.map((part, index) => {
          const color =
            part.added === true
              ? 'text-green-600 bg-green-100'
              : part.removed === true
                ? 'text-red-600 bg-red-100'
                : 'text-gray-600'

          return (
            <span key={index} className={color}>
              {part.value}
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">HTML Changes Observer</h3>
      </div>

      {/* Side-by-side layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Original content */}
        <div className="space-y-2">
          <h4 className="text-md font-medium text-gray-700">Current Content</h4>
          <div
            ref={targetNode}
            className="min-h-[200px] overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-600"
          >
            {children}
          </div>
        </div>

        {/* Diff display */}
        <div className="space-y-2">
          <h4 className="text-md font-medium text-gray-700">Changes Diff</h4>
          <div className="min-h-[200px] overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
            {diff.length > 0 ? (
              renderDiffAsHTML(diff)
            ) : (
              <div className="italic text-gray-500">No changes detected yet...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  none: 'background: transparent; color:black',
  gray: 'background: transparent; color: gray',
  bgGreen: 'background: green; color:black',
  bgRed: 'background: red; color:black',
}

function logDiff(diff: any[]) {
  let output = '',
    styleArr: string[] = []

  if (diff.length === 1 && diff[0] && !diff[0].added && !diff[0].removed) return output

  for (const part of diff) {
    var index = diff.indexOf(part),
      partValue = part.value

    if (part.added || part.removed) {
      output += index === 0 ? '\n' : ''
      output += '%c' + partValue
      styleArr.push(part.added ? styles.bgGreen : styles.bgRed)
    } else {
      output += index !== 0 ? '' : '\n'
      output += '%c' + partValue
      styleArr.push(styles.gray)
    }
  }
  console.log(performance.now() + 'ms DOM changes: ' + output, ...styleArr)
}
