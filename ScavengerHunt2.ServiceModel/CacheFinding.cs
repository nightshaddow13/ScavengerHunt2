using ServiceStack;
using ServiceStack.DataAnnotations;

namespace ScavengerHunt.ServiceModel;

#region Base definition

[Icon(Svg = Icons.CacheFinding)]
public class CacheFinding : AuditBase
{
    [AutoIncrement]
    public long Id { get; set; }

    [Ref(Model = nameof(Cache), RefId = nameof(Cache.Id), RefLabel = nameof(Cache.Name))]
    [References(typeof(Cache))]
    public long CacheId { get; set; }

    [Reference]
    Cache Cache { get; set; } = default!;

    [Ref(Model = nameof(Scouter), RefId = nameof(Scouter.Id), RefLabel = nameof(Scouter.LinkingId))]
    [References(typeof(Scouter))]
    public long ScouterId { get; set; }

    [Reference]
    Scouter Scouter { get; set; } = default!;

    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }
    public int BasePoints { get; set; }
    public int BountyPoints { get; set; }
    public bool IsValidFind {  get; set; }
}

#endregion

#region Interactions

[Tag("Caches"), Description("Find CacheFindings")]
[ValidateHasRole(Roles.Staff)]
[AutoApply(Behavior.AuditQuery)]
public class QueryCacheFindings : QueryDb<CacheFinding> { }

[Tag("Caches"), Description("Create a new CacheFinding")]
[ValidateHasRole(Roles.Staff)]
[AutoApply(Behavior.AuditCreate)]
public class CreateCacheFinding : ICreateDb<CacheFinding>, IReturn<IdResponse>
{
    public long CacheId { get; set; }
    public long ScouterId { get; set; }

    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }

    [ValidateGreaterThan(0)]
    public int BasePoints { get; set; }

    [ValidateGreaterThan(0)]
    public int BountyPoints { get; set; }

    public bool IsValidFind { get; set; }
}

[Tag("Caches"), Description("Update an existing CacheFinding")]
[ValidateHasRole(Roles.Staff)]
[AutoApply(Behavior.AuditModify)]
public class UpdateCacheFinding : IPatchDb<CacheFinding>, IReturn<IdResponse>
{
    public long Id { get; set; }

    public long CacheId { get; set; }
    public long ScouterId { get; set; }

    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }

    [ValidateGreaterThan(0)]
    public int BasePoints { get; set; }

    [ValidateGreaterThan(0)]
    public int BountyPoints { get; set; }

    public bool IsValidFind { get; set; }
}

[Tag("Caches"), Description("Delete a CacheFinding")]
[ValidateHasRole(Roles.Admin)]
[AutoApply(Behavior.AuditSoftDelete)]
public class DeleteCacheFinding : IDeleteDb<CacheFinding>, IReturnVoid
{
    public long Id { get; set; }
}

#endregion