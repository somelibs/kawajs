# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- `ResourceCall` no longer throws a `TypeError` (masking the real HTTP error)
  when a deduplicated/short-circuited request fails — the error payload now
  reports `url: null` instead of dereferencing an unset request URL.
