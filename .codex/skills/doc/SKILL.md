---
name: doc
description: Use when working with doc
doc_version:
---

# Doc Skill

Use when working with doc, generated from official documentation.

## When to Use This Skill

This skill should be triggered when:

- Working with doc
- Asking about doc features or APIs
- Implementing doc solutions
- Debugging doc code
- Learning doc best practices

## Quick Reference

### Common Patterns

**Pattern 1:** Access Control ​The framework has built-in three types of access control methods:Determining whether a menu or button can be accessed based on user...

```
router.addRoute
```

**Pattern 2:** ts// Set the login user information, ensuring that userInfo

```
// Set the login user information, ensuring that userInfo.roles is an array and contains permissions from the route table
// For example: userInfo.roles=['super', 'admin']
authStore.setUserInfo(userInfo);
```

**Pattern 3:** The data structure returned by the permission code is an array of strings, for example: ['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010']

```
['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010']
```

**Pattern 4:** Build and Deployment ​PrefaceSince this is a demonstration project, the package size after building is relatively large

```
pnpm build
```

**Pattern 5:** After the build is successful, a dist folder for the corresponding application will be generated in the root directory, which contains the built an...

```
dist
```

**Pattern 6:** Configuration ​Environment Variable Configuration ​The project's environment variable configuration is located in the application directory under

```
.env
```

**Pattern 7:** External Modules ​In addition to the external modules that are included by default in the project, sometimes we need to import other external modules

```
pnpm
```

**Pattern 8:** Internationalization ​The project has integrated Vue i18n, and Chinese and English language packs have been configured

```
src/preferences.ts
```

### Example Code Patterns

**Example 1** (json):

```json
{
    meta: {
      authority: ['super'],
    },
},
```

**Example 2** (json):

```json
{
  "dependencies": {
    "@vben/utils": "workspace:*"
  }
}
```

**Example 3** (sql):

```sql
import { isString } from '@vben/utils';
```

## Reference Files

This skill includes comprehensive documentation in `references/`:

- **components.md** - Components documentation
- **guide.md** - Guide documentation
- **other.md** - Other documentation

Use `view` to read specific reference files when detailed information is needed.

## Working with This Skill

### For Beginners

Start with the getting_started or tutorials reference files for foundational concepts.

### For Specific Features

Use the appropriate category reference file (api, guides, etc.) for detailed information.

### For Code Examples

The quick reference section above contains common patterns extracted from the official docs.

## Resources

### references/

Organized documentation extracted from official sources. These files contain:

- Detailed explanations
- Code examples with language annotations
- Links to original documentation
- Table of contents for quick navigation

### scripts/

Add helper scripts here for common automation tasks.

### assets/

Add templates, boilerplate, or example projects here.

## Notes

- This skill was automatically generated from official documentation
- Reference files preserve the structure and examples from source docs
- Code examples include language detection for better syntax highlighting
- Quick reference patterns are extracted from common usage examples in the docs

## Updating

To refresh this skill with updated documentation:

1. Re-run the scraper with the same configuration
2. The skill will be rebuilt with the latest information
