# 5 myths about Tanimoto similarity and Morgan Fingerprints

*Published on October 12, 2025*

When it comes to comparing chemical compounds, Tanimoto Similarity is a go-to tool in the world of chemical informatics. But like any popular tool, it’s surrounded by myths and misconceptions. Let’s dive into the top five myths about Tanimoto Similarity and uncover the truth behind this widely used metric.

## Myth 1: Tanimoto Similarity is an Absolute Measure
The Myth: _Tanimoto Similarity is a fixed, absolute measure of similarity_.
The Truth: Tanimoto Similarity is actually a mathematical measure (Jaccard Index) that calculates similarity based on the underlying fingerprints of the compounds. The similarity score depends entirely on the type of fingerprint used (e.g., Morgan fingerprints) and its parameters (like radius and length). For example, the similarity score for Morgan fingerprints with a radius of 2 will differ from that of other fingerprints. So, always specify the fingerprint type and parameters when discussing Tanimoto Similarity—it’s not a one-size-fits-all metric (see also [Greg Landrum post](https://greglandrum.github.io/rdkit-blog/posts/2025-07-17-naming-similarity-metrics.html)). From mathematical perspective, it is a similarity measure such as cosine similarity or L2 known from ML. Why then use Jaccard Index, but not cosine similarity? The Jaccard Index relies only on the bits set to True, so we are measuring how many similar features there are in compounds, not how many features are absent.

## Myth 2: Morgan Fingerprints of radius R Represent Groups of Atoms joined by R atoms
The Myth: _Morgan fingerprints are just groups of atoms connected by R bonds_.
The Truth: Morgan fingerprints are more nuanced. They’re built by hashing information about atoms and their neighbors in iterative steps. The “radius” refers to the number of iterations, not a physical distance. For example, a radius of 2 means information is passed iteratively in two steps. In the first step, each atom is influenced by its neares neighbours. In the second, only the nearest neighbours influence each atom, but as these atoms already encode the information about _their nearest neigbours_. So it’s not just about atom groups—it’s about how information flows through the molecular structure.

## Myth 3: Morgan Fingerprints Encode Chemical Similarity
The Myth: _Morgan fingerprints capture chemical similarity between compounds_.
The Truth: Morgan fingerprints encode graph similarity, not chemical similarity. They represent the molecular structure as a graph, but they don’t account for chemical properties. For instance, atoms like chlorine and bromine, which are chemically similar, aren’t treated as such in Morgan fingerprints. The focus is on connectivity, not chemistry. As a result, the Tanimoto Similarity (based on Morgan Fingerprints) does not measure chemical, but rather graph similarity. So two compounds might have very similar graph structure, and therefore high Tanimoto Similarity, but their chemical properties might be different.

## Myth 4: The Morgan Fingerprints (and hence Tanimoto similarity) are smiles-independent
The Myth: _The Morgagn fingerprints of the same compound created from any smiles of this compound will be equal_.
The Truth: It will, if you handle the smiles correctly. If you fail to notify the software, that e.g. an atom is part of the aromatic system, the information will not be encoded in the atom id, which builds up the Morgan Figerprint. So before calculating the Morgan Fingerprint in rdKit, please always sanitize the molecule.

## Myth 5: There’s a Fixed Cutoff for Similarity
The Myth: _A Tanimoto Similarity score below 0.4 means compounds are dissimilar, and above 0.8 means they’re similar_.
The Truth: There’s no universal cutoff. Tanimoto Similarity is influenced by many factors, including the size of the molecules — smaller molecules tend to have higher similarity scores because fewer bits are set in their fingerprints, and therefore the denominator _might_ be smaller. There is also a notion of _bit clash_, as two unrelated substructures can set the same bit. Additionally, two molecules with high Tanimoto Similarity might still be chemically different. Use Tanimoto Similarity as a guide, not a rule.

## Why Does This Matter?
Understanding the construction of Fingerprints and Tanimoto Similarity is crucial for tasks like drug discovery and machine learning. Misinterpreting Tanimoto Similarity can lead to:
* Leaky datasets: Poor splits between training and testing data.
* Misleading clustering: Incorrect grouping of compounds based on graph similarity instead of chemical properties.
* Inefficient searches: Overlooking chemically relevant compounds due to graph-based metrics.
For tasks where 3D structure matters (like molecular docking), consider metrics like the [SuCOS](https://chemrxiv.org/engage/api-gateway/chemrxiv/assets/orp/resource/item/60c741a99abda23230f8bed5/original/su-cos-is-better-than-rmsd-for-evaluating-fragment-elaboration-and-docking-poses.pdf) score, which accounts for spatial arrangements.

## Final Thoughts
Tanimoto Similarity and Morgan fingerprints are powerful tools, but they’re not magic. They’re best used as proxies for molecular similarity, not definitive measures. Always tailor your approach to the task at hand, and remember: similarity in graphs doesn’t always mean similarity in chemistry.
So, the next time you’re comparing compounds, think beyond the numbers—what’s the story behind the similarity?

# Further reading
- [Explaining Morgan Fingerprint](https://rdkit.blogspot.com/2016/03/explaining-morgan-similarity.html)
- [Threshold for for random in fingerprints](https://greglandrum.github.io/rdkit-blog/posts/2021-05-18-fingerprint-thresholds1.html)
- [Tanimoto similarity of ECFPs with RDKit: Common pitfalls](https://www.blopig.com/blog/2024/09/tanimoto-similarity-of-ecfps-with-rdkit-common-pitfalls)
