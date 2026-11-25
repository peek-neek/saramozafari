"use client"

import { useCallback, useSyncExternalStore } from "react"

import type { ListingStatus } from "@/lib/site-data"

export type ListingFilter = "all" | ListingStatus

export const LISTING_FILTERS: readonly ListingFilter[] = [
  "all",
  "active",
  "sold",
  "leased",
]

const KEY = "saramoz:listing-filter"
/** Same-tab change signal; the `storage` event only fires in other tabs. */
const EVENT = "saramoz:listing-filter-change"

const isFilter = (v: unknown): v is ListingFilter =>
  LISTING_FILTERS.includes(v as ListingFilter)

// Fallback for when storage is blocked (private mode, strict settings): the
// choice still works for this visit, it just isn't remembered.
let memory: ListingFilter = "all"

function read(): ListingFilter {
  try {
    const stored = window.localStorage.getItem(KEY)
    if (isFilter(stored)) return stored
  } catch {}
  return memory
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(EVENT, onChange)
  window.addEventListener("hashchange", onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener("hashchange", onChange)
  }
}

/**
 * The visitor's listings filter, remembered in localStorage. The server (and
 * the first client render) always sees "all", so the HTML matches on hydrate.
 */
export function useListingFilter() {
  const filter = useSyncExternalStore(subscribe, read, () => "all" as const)

  const setFilter = useCallback((next: ListingFilter) => {
    memory = next
    try {
      window.localStorage.setItem(KEY, next)
    } catch {}
    // A hash like #listing-<slug> forces "all" (see useHash below); picking a
    // filter is an explicit choice, so drop it.
    if (window.location.hash.startsWith("#listing-")) {
      history.replaceState(
        history.state,
        "",
        window.location.pathname + window.location.search
      )
    }
    window.dispatchEvent(new Event(EVENT))
  }, [])

  return [filter, setFilter] as const
}

/** The URL hash, e.g. "#listing-8501-bayview-avenue"; "" on the server. */
export function useHash() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => ""
  )
}
